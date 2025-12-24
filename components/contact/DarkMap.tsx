'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface DarkMapProps {
  latitude: number
  longitude: number
  address: string
  className?: string
}

// Create a custom dark-themed marker icon
const createCustomIcon = () => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 32px;
        height: 32px;
        background-color: #F9BD65;
        border: 3px solid white;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        position: relative;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      ">
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
          width: 12px;
          height: 12px;
          background-color: white;
          border-radius: 50%;
        "></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  })
}

export default function DarkMap({ latitude, longitude, address, className = '' }: DarkMapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    // Initialize map with dark tile layer
    const map = L.map(mapContainerRef.current, {
      center: [latitude, longitude],
      zoom: 15,
      zoomControl: true,
      attributionControl: false,
    })

    // Use CartoDB Dark Matter tile layer for dark theme
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map)

    // Add marker with custom icon
    const marker = L.marker([latitude, longitude], {
      icon: createCustomIcon()
    }).addTo(map)

    // Add popup with address
    marker.bindPopup(address).openPopup()

    mapRef.current = map

    // Invalidate size to ensure map renders correctly
    setTimeout(() => {
      map.invalidateSize()
    }, 100)

    // Cleanup
    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [latitude, longitude, address])


  return (
    <div
      ref={mapContainerRef}
      className={`w-full h-full dark-map-container ${className}`}
      style={{ zIndex: 1 }}
    />
  )
}

