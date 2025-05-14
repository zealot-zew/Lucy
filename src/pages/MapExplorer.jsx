import React from 'react'

const MapExplorer = () => {
    return (
        <div className='dark:text-white-400
        '>MapExplorer coming soon!</div>
    )
}

export default MapExplorer

// import React, { useState, useEffect, useRef } from 'react';
// import { GoogleGenAI } from '@google/genai';
// import '../styles/mapexplorer.css';

// // API KEY LOCATION: Replace this with your own API key
// const GOOGLE_AI_API_KEY = "YOUR_GOOGLE_AI_API_KEY_HERE";
// const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY_HERE"; // Used in index.html script tag

// const MapExplorer = () => {
//     // State variables
//     const [map, setMap] = useState(null);
//     const [points, setPoints] = useState([]);
//     const [markers, setMarkers] = useState([]);
//     const [lines, setLines] = useState([]);
//     const [popUps, setPopUps] = useState([]);
//     const [bounds, setBounds] = useState(null);
//     const [activeCardIndex, setActiveCardIndex] = useState(0);
//     const [isPlannerMode, setIsPlannerMode] = useState(false);
//     const [dayPlanItinerary, setDayPlanItinerary] = useState([]);
//     const [promptValue, setPromptValue] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [errorMessage, setErrorMessage] = useState('');
//     const [isTimelineVisible, setIsTimelineVisible] = useState(false);

//     // Refs
//     const mapRef = useRef(null);
//     const cardContainerRef = useRef(null);
//     const carouselIndicatorsRef = useRef(null);
//     const timelineRef = useRef(null);
//     const timelineContainerRef = useRef(null);
//     const mapContainerRef = useRef(null);
//     const mapOverlayRef = useRef(null);

//     // Function declaration for extracting location data using Google AI
//     const locationFunctionDeclaration = {
//         name: 'location',
//         parameters: {
//             type: 'OBJECT',
//             description: 'Geographic coordinates of a location.',
//             properties: {
//                 name: {
//                     type: 'STRING',
//                     description: 'Name of the location.',
//                 },
//                 description: {
//                     type: 'STRING',
//                     description:
//                         'Description of the location: why is it relevant, details to know.',
//                 },
//                 lat: {
//                     type: 'STRING',
//                     description: 'Latitude of the location.',
//                 },
//                 lng: {
//                     type: 'STRING',
//                     description: 'Longitude of the location.',
//                 },
//                 // Properties specific to Day Planner mode
//                 time: {
//                     type: 'STRING',
//                     description:
//                         'Time of day to visit this location (e.g., "09:00", "14:30").',
//                 },
//                 duration: {
//                     type: 'STRING',
//                     description:
//                         'Suggested duration of stay at this location (e.g., "1 hour", "45 minutes").',
//                 },
//                 sequence: {
//                     type: 'NUMBER',
//                     description: 'Order in the day itinerary (1 = first stop of the day).',
//                 },
//             },
//             required: ['name', 'description', 'lat', 'lng'],
//         },
//     };

//     // Function declaration for extracting route/line data using Google AI
//     const lineFunctionDeclaration = {
//         name: 'line',
//         parameters: {
//             type: 'OBJECT',
//             description: 'Connection between a start location and an end location.',
//             properties: {
//                 name: {
//                     type: 'STRING',
//                     description: 'Name of the route or connection',
//                 },
//                 start: {
//                     type: 'OBJECT',
//                     description: 'Start location of the route',
//                     properties: {
//                         lat: {
//                             type: 'STRING',
//                             description: 'Latitude of the start location.',
//                         },
//                         lng: {
//                             type: 'STRING',
//                             description: 'Longitude of the start location.',
//                         },
//                     },
//                 },
//                 end: {
//                     type: 'OBJECT',
//                     description: 'End location of the route',
//                     properties: {
//                         lat: {
//                             type: 'STRING',
//                             description: 'Latitude of the end location.',
//                         },
//                         lng: {
//                             type: 'STRING',
//                             description: 'Longitude of the end location.',
//                         },
//                     },
//                 },
//                 // Properties specific to Day Planner mode
//                 transport: {
//                     type: 'STRING',
//                     description:
//                         'Mode of transportation between locations (e.g., "walking", "driving", "public transit").',
//                 },
//                 travelTime: {
//                     type: 'STRING',
//                     description:
//                         'Estimated travel time between locations (e.g., "15 minutes", "1 hour").',
//                 },
//             },
//             required: ['name', 'start', 'end'],
//         },
//     };

//     // System instructions provided to the Google AI model guiding its responses
//     const systemInstructions = `## System Instructions for an Interactive Map Explorer

// **Model Persona:** You are a knowledgeable, geographically-aware assistant that provides visual information through maps.
// Your primary goal is to answer any location-related query comprehensively, using map-based visualizations.
// You can process information about virtually any place, real or fictional, past, present, or future.

// **Core Capabilities:**

// 1. **Geographic Knowledge:** You possess extensive knowledge of:
//    * Global locations, landmarks, and attractions
//    * Historical sites and their significance
//    * Natural wonders and geography
//    * Cultural points of interest
//    * Travel routes and transportation options

// 2. **Two Operation Modes:**

//    **A. General Explorer Mode** (Default when DAY_PLANNER_MODE is false):
//    * Respond to any query by identifying relevant geographic locations
//    * Show multiple points of interest related to the query
//    * Provide rich descriptions for each location
//    * Connect related locations with appropriate paths
//    * Focus on information delivery rather than scheduling

//    **B. Day Planner Mode** (When DAY_PLANNER_MODE is true):
//    * Create detailed day itineraries with:
//      * A logical sequence of locations to visit throughout a day (typically 4-6 major stops)
//      * Specific times and realistic durations for each location visit
//      * Travel routes between locations with appropriate transportation methods
//      * A balanced schedule considering travel time, meal breaks, and visit durations
//      * Each location must include a 'time' (e.g., "09:00") and 'duration' property
//      * Each location must include a 'sequence' number (1, 2, 3, etc.) to indicate order
//      * Each line connecting locations should include 'transport' and 'travelTime' properties

// **Output Format:**

// 1. **General Explorer Mode:**
//    * Use the "location" function for each relevant point of interest with name, description, lat, lng
//    * Use the "line" function to connect related locations if appropriate
//    * Provide as many interesting locations as possible (4-8 is ideal)
//    * Ensure each location has a meaningful description

// 2. **Day Planner Mode:**
//    * Use the "location" function for each stop with required time, duration, and sequence properties
//    * Use the "line" function to connect stops with transport and travelTime properties
//    * Structure the day in a logical sequence with realistic timing
//    * Include specific details about what to do at each location

// **Important Guidelines:**
// * For ANY query, always provide geographic data through the location function
// * If unsure about a specific location, use your best judgment to provide coordinates
// * Never reply with just questions or requests for clarification
// * Always attempt to map the information visually, even for complex or abstract queries
// * For day plans, create realistic schedules that start no earlier than 8:00am and end by 9:00pm

// Remember: In default mode, respond to ANY query by finding relevant locations to display on the map, even if not explicitly about travel or geography. In day planner mode, create structured day itineraries.`;

//     // Initialize Google Maps when component mounts
//     useEffect(() => {
//         const initMap = async () => {
//             try {
//                 // Import Google Maps libraries
//                 const { Map } = await window.google.maps.importLibrary('maps');
//                 const { LatLngBounds } = await window.google.maps.importLibrary('core');
//                 const { AdvancedMarkerElement } = await window.google.maps.importLibrary('marker');

//                 // Create bounds object
//                 const newBounds = new LatLngBounds();
//                 setBounds(newBounds);

//                 // Create map instance
//                 const newMap = new Map(mapRef.current, {
//                     center: { lat: -34.397, lng: 150.644 }, // Default center
//                     zoom: 8, // Default zoom
//                     mapId: '4504f8b37365c3d0', // Custom map ID for styling
//                     gestureHandling: 'greedy', // Allows easy map interaction on all devices
//                     zoomControl: false,
//                     cameraControl: false,
//                     mapTypeControl: false,
//                     scaleControl: false,
//                     streetViewControl: false,
//                     rotateControl: false,
//                     fullscreenControl: false,
//                 });
//                 setMap(newMap);

//                 // Define a custom Popup class extending Google Maps OverlayView
//                 window.Popup = class Popup extends window.google.maps.OverlayView {
//                     constructor(position, content) {
//                         super();
//                         this.position = position;
//                         content.classList.add('popup-bubble');

//                         this.containerDiv = document.createElement('div');
//                         this.containerDiv.classList.add('popup-container');
//                         this.containerDiv.appendChild(content); // Append the actual content here
//                         // Prevent clicks inside the popup from propagating to the map
//                         Popup.preventMapHitsAndGesturesFrom(this.containerDiv);
//                     }

//                     /** Called when the popup is added to the map via setMap(). */
//                     onAdd() {
//                         this.getPanes().floatPane.appendChild(this.containerDiv);
//                     }

//                     /** Called when the popup is removed from the map via setMap(null). */
//                     onRemove() {
//                         if (this.containerDiv.parentElement) {
//                             this.containerDiv.parentElement.removeChild(this.containerDiv);
//                         }
//                     }

//                     /** Called each frame when the popup needs to draw itself. */
//                     draw() {
//                         const divPosition = this.getProjection().fromLatLngToDivPixel(
//                             this.position,
//                         );
//                         // Hide the popup when it is far out of view for performance
//                         const display =
//                             Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000
//                                 ? 'block'
//                                 : 'none';

//                         if (display === 'block') {
//                             this.containerDiv.style.left = divPosition.x + 'px';
//                             this.containerDiv.style.top = divPosition.y + 'px';
//                         }

//                         if (this.containerDiv.style.display !== display) {
//                             this.containerDiv.style.display = display;
//                         }
//                     }
//                 };
//             } catch (error) {
//                 console.error("Error initializing Google Maps:", error);
//                 setErrorMessage("Failed to load Google Maps. Please check your API key and try again.");
//             }
//         };

//         if (window.google && window.google.maps) {
//             initMap();
//         } else {
//             // If Google Maps API is not loaded yet, wait for it
//             window.initMapExplorer = initMap;
//             const script = document.createElement('script');
//             script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMapExplorer`;
//             script.async = true;
//             script.defer = true;
//             document.head.appendChild(script);
//         }
//     }, []);

//     // Functions to control the visibility of the timeline panel
//     const showTimeline = () => {
//         if (timelineContainerRef.current) {
//             timelineContainerRef.current.style.display = 'block';

//             // Delay adding 'visible' class for CSS transition effect
//             setTimeout(() => {
//                 timelineContainerRef.current.classList.add('visible');

//                 if (window.innerWidth > 768) {
//                     // Desktop view
//                     mapContainerRef.current.classList.add('map-container-shifted');
//                     adjustInterfaceForTimeline(true);
//                     window.dispatchEvent(new Event('resize')); // Force map redraw
//                 } else {
//                     // Mobile view
//                     mapOverlayRef.current.classList.add('visible');
//                 }
//             }, 10);

//             setIsTimelineVisible(true);
//         }
//     };

//     const hideTimeline = () => {
//         if (timelineContainerRef.current) {
//             timelineContainerRef.current.classList.remove('visible');
//             mapContainerRef.current.classList.remove('map-container-shifted');
//             mapOverlayRef.current.classList.remove('visible');
//             adjustInterfaceForTimeline(false);

//             // Wait for transition before setting display to none
//             setTimeout(() => {
//                 timelineContainerRef.current.style.display = 'none';
//                 window.dispatchEvent(new Event('resize'));
//             }, 300);

//             setIsTimelineVisible(false);
//         }
//     };

//     // Adjusts map bounds when the timeline visibility changes
//     const adjustInterfaceForTimeline = (isVisible) => {
//         if (bounds && map) {
//             setTimeout(() => {
//                 map.fitBounds(bounds);
//             }, 350); // Delay to allow layout adjustments
//         }
//     };

//     // Resets the map and application state to initial conditions
//     const restart = () => {
//         setPoints([]);

//         if (window.google && window.google.maps) {
//             const newBounds = new window.google.maps.LatLngBounds();
//             setBounds(newBounds);
//         }

//         setDayPlanItinerary([]);

//         markers.forEach((marker) => marker.setMap(null));
//         setMarkers([]);

//         lines.forEach((line) => {
//             line.poly.setMap(null);
//             line.geodesicPoly.setMap(null);
//         });
//         setLines([]);

//         popUps.forEach((popup) => {
//             popup.popup.setMap(null);
//             if (popup.content && popup.content.remove) popup.content.remove();
//         });
//         setPopUps([]);

//         if (cardContainerRef.current) cardContainerRef.current.innerHTML = '';
//         if (carouselIndicatorsRef.current) carouselIndicatorsRef.current.innerHTML = '';
//         if (timelineRef.current) timelineRef.current.innerHTML = '';
//         if (isTimelineVisible) hideTimeline();
//     };

//     // Handle keyboard input in prompt textbox
//     const handlePromptKeyDown = (e) => {
//         if (e.code === 'Enter' && !e.shiftKey) {
//             // Allow shift+enter for new lines
//             e.preventDefault();
//             e.stopPropagation();
//             sendText(promptValue);
//         }
//     };

//     // Sends the user's prompt to the Google AI and processes the response
//     const sendText = async (prompt) => {
//         if (!prompt.trim()) return;

//         setIsLoading(true);
//         setErrorMessage('');
//         restart();

//         try {
//             // Initialize the Google AI client with your API key
//             const ai = new GoogleGenAI({
//                 vertexai: false,
//                 apiKey: GOOGLE_AI_API_KEY
//             });

//             let finalPrompt = prompt;
//             if (isPlannerMode) {
//                 finalPrompt = prompt + ' day trip';
//             }

//             const updatedInstructions = isPlannerMode
//                 ? systemInstructions.replace('DAY_PLANNER_MODE', 'true')
//                 : systemInstructions.replace('DAY_PLANNER_MODE', 'false');

//             const response = await ai.models.generateContentStream({
//                 model: 'gemini-2.0-flash-exp',
//                 contents: finalPrompt,
//                 config: {
//                     systemInstruction: updatedInstructions,
//                     temperature: 1,
//                     tools: [
//                         {
//                             functionDeclarations: [
//                                 locationFunctionDeclaration,
//                                 lineFunctionDeclaration,
//                             ],
//                         },
//                     ],
//                 },
//             });

//             let text = '';
//             let results = false;

//             for await (const chunk of response) {
//                 const fns = chunk.functionCalls ?? [];
//                 for (const fn of fns) {
//                     if (fn.name === 'location') {
//                         await setPin(fn.args);
//                         results = true;
//                     }
//                     if (fn.name === 'line') {
//                         await setLeg(fn.args);
//                         results = true;
//                     }
//                 }

//                 if (
//                     chunk.candidates &&
//                     chunk.candidates.length > 0 &&
//                     chunk.candidates[0].content &&
//                     chunk.candidates[0].content.parts
//                 ) {
//                     chunk.candidates[0].content.parts.forEach((part) => {
//                         if (part.text) text += part.text;
//                     });
//                 } else if (chunk.text) {
//                     text += chunk.text;
//                 }
//             }

//             if (!results) {
//                 throw new Error(
//                     'Could not generate any results. Try again, or try a different prompt.',
//                 );
//             }

//             if (isPlannerMode && dayPlanItinerary.length > 0) {
//                 const sortedItinerary = [...dayPlanItinerary].sort(
//                     (a, b) =>
//                         (a.sequence || Infinity) - (b.sequence || Infinity) ||
//                         (a.time || '').localeCompare(b.time || ''),
//                 );
//                 setDayPlanItinerary(sortedItinerary);
//                 createTimeline();
//                 showTimeline();
//             }

//             createLocationCards();
//             setPromptValue('');
//         } catch (e) {
//             setErrorMessage(e.message);
//             console.error('Error generating content:', e);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // Adds a pin (marker and popup) to the map for a given location
//     const setPin = async (args) => {
//         if (!map || !window.google) return;

//         const point = { lat: Number(args.lat), lng: Number(args.lng) };
//         setPoints(prev => [...prev, point]);
//         bounds.extend(point);
//         setBounds(bounds);

//         const { AdvancedMarkerElement } = await window.google.maps.importLibrary('marker');
//         const marker = new AdvancedMarkerElement({
//             map,
//             position: point,
//             title: args.name,
//         });

//         setMarkers(prev => [...prev, marker]);
//         map.panTo(point);
//         map.fitBounds(bounds);

//         const content = document.createElement('div');
//         let timeInfo = '';
//         if (args.time) {
//             timeInfo = `<div style="margin-top: 4px; font-size: 12px; color: #2196F3;">
//                     <i class="fas fa-clock"></i> ${args.time}
//                     ${args.duration ? ` • ${args.duration}` : ''}
//                   </div>`;
//         }
//         content.innerHTML = `<b>${args.name}</b><br/>${args.description}${timeInfo}`;

//         const popup = new window.Popup(new window.google.maps.LatLng(point), content);

//         if (!isPlannerMode) {
//             popup.setMap(map);
//         }

//         const locationInfo = {
//             name: args.name,
//             description: args.description,
//             position: new window.google.maps.LatLng(point),
//             popup,
//             content,
//             time: args.time,
//             duration: args.duration,
//             sequence: args.sequence,
//         };

//         setPopUps(prev => [...prev, locationInfo]);

//         if (isPlannerMode && args.time) {
//             setDayPlanItinerary(prev => [...prev, locationInfo]);
//         }
//     };

//     // Adds a line (route) between two locations on the map
//     const setLeg = async (args) => {
//         if (!map || !window.google) return;

//         const start = {
//             lat: Number(args.start.lat),
//             lng: Number(args.start.lng),
//         };
//         const end = { lat: Number(args.end.lat), lng: Number(args.end.lng) };

//         setPoints(prev => [...prev, start, end]);
//         bounds.extend(start);
//         bounds.extend(end);
//         setBounds(bounds);
//         map.fitBounds(bounds);

//         const polyOptions = {
//             strokeOpacity: 0.0, // Invisible base line
//             strokeWeight: 3,
//             map,
//         };

//         const geodesicPolyOptions = {
//             strokeColor: isPlannerMode ? '#2196F3' : '#CC0099',
//             strokeOpacity: 1.0,
//             strokeWeight: isPlannerMode ? 4 : 3,
//             map,
//         };

//         if (isPlannerMode) {
//             geodesicPolyOptions['icons'] = [
//                 {
//                     icon: { path: 'M 0,-1 0,1', strokeOpacity: 1, scale: 3 },
//                     offset: '0',
//                     repeat: '15px',
//                 },
//             ];
//         }

//         const poly = new window.google.maps.Polyline(polyOptions);
//         const geodesicPoly = new window.google.maps.Polyline(geodesicPolyOptions);

//         const path = [start, end];
//         poly.setPath(path);
//         geodesicPoly.setPath(path);

//         setLines(prev => [...prev, {
//             poly,
//             geodesicPoly,
//             name: args.name,
//             transport: args.transport,
//             travelTime: args.travelTime,
//         }]);
//     };

//     // Creates and populates the timeline view for the day plan
//     const createTimeline = () => {
//         if (!timelineRef.current || dayPlanItinerary.length === 0) return;
//         timelineRef.current.innerHTML = '';

//         dayPlanItinerary.forEach((item, index) => {
//             const timelineItem = document.createElement('div');
//             timelineItem.className = 'timeline-item';
//             const timeDisplay = item.time || 'Flexible';

//             timelineItem.innerHTML = `
//         <div class="timeline-time">${timeDisplay}</div>
//         <div class="timeline-connector">
//           <div class="timeline-dot"></div>
//           <div class="timeline-line"></div>
//         </div>
//         <div class="timeline-content" data-index="${index}">
//           <div class="timeline-title">${item.name}</div>
//           <div class="timeline-description">${item.description}</div>
//           ${item.duration ? `<div class="timeline-duration">${item.duration}</div>` : ''}
//         </div>
//       `;

//             const timelineContent = timelineItem.querySelector('.timeline-content');
//             if (timelineContent) {
//                 timelineContent.addEventListener('click', () => {
//                     const popupIndex = popUps.findIndex((p) => p.name === item.name);
//                     if (popupIndex !== -1) {
//                         highlightCard(popupIndex);
//                         map.panTo(popUps[popupIndex].position);
//                     }
//                 });
//             }
//             timelineRef.current.appendChild(timelineItem);
//         });

//         if (lines.length > 0 && isPlannerMode) {
//             const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
//             for (let i = 0; i < timelineItems.length - 1; i++) {
//                 const currentItem = dayPlanItinerary[i];
//                 const nextItem = dayPlanItinerary[i + 1];
//                 const connectingLine = lines.find(
//                     (line) =>
//                         line.name.includes(currentItem.name) ||
//                         line.name.includes(nextItem.name),
//                 );

//                 if (
//                     connectingLine &&
//                     (connectingLine.transport || connectingLine.travelTime)
//                 ) {
//                     const transportItem = document.createElement('div');
//                     transportItem.className = 'timeline-item transport-item';
//                     transportItem.innerHTML = `
//             <div class="timeline-time"></div>
//             <div class="timeline-connector">
//               <div class="timeline-dot" style="background-color: #999;"></div>
//               <div class="timeline-line"></div>
//             </div>
//             <div class="timeline-content transport">
//               <div class="timeline-title">
//                 <i class="fas fa-${getTransportIcon(connectingLine.transport || 'travel')}"></i>
//                 ${connectingLine.transport || 'Travel'}
//               </div>
//               <div class="timeline-description">${connectingLine.name}</div>
//               ${connectingLine.travelTime ? `<div class="timeline-duration">${connectingLine.travelTime}</div>` : ''}
//             </div>
//           `;
//                     timelineItems[i].after(transportItem);
//                 }
//             }
//         }
//     };

//     // Returns an appropriate Font Awesome icon class based on transport type
//     const getTransportIcon = (transportType) => {
//         const type = (transportType || '').toLowerCase();
//         if (type.includes('walk')) {
//             return 'walking';
//         }
//         if (type.includes('car') || type.includes('driv')) {
//             return 'car-side';
//         }
//         if (
//             type.includes('bus') ||
//             type.includes('transit') ||
//             type.includes('public')
//         ) {
//             return 'bus-alt';
//         }
//         if (
//             type.includes('train') ||
//             type.includes('subway') ||
//             type.includes('metro')
//         ) {
//             return 'train';
//         }
//         if (type.includes('bike') || type.includes('cycl')) {
//             return 'bicycle';
//         }
//         if (type.includes('taxi') || type.includes('cab')) {
//             return 'taxi';
//         }
//         if (type.includes('boat') || type.includes('ferry')) {
//             return 'ship';
//         }
//         if (type.includes('plane') || type.includes('fly')) {
//             return 'plane-departure';
//         }
//         {
//             return 'route';
//         } // Default icon
//     };

//     // Generates a placeholder SVG image for location cards
//     const getPlaceholderImage = (locationName) => {
//         let hash = 0;
//         for (let i = 0; i < locationName.length; i++) {
//             hash = locationName.charCodeAt(i) + ((hash << 5) - hash);
//         }
//         const hue = hash % 360;
//         const saturation = 60 + (hash % 30);
//         const lightness = 50 + (hash % 20);
//         const letter = locationName.charAt(0).toUpperCase() || '?';

//         return `data:image/svg+xml,${encodeURIComponent(`
//       <svg xmlns="http://www.w3.org/2000/svg" width="300" height="180" viewBox="0 0 300 180">
//         <rect width="300" height="180" fill="hsl(${hue}, ${saturation}%, ${lightness}%)" />
//         <text x="150" y="95" font-family="Arial, sans-serif" font-size="72" fill="white" text-anchor="middle" dominant-baseline="middle">${letter}</text>
//       </svg>
//     `)}`;
//     };

//     // Creates and displays location cards in the carousel
//     const createLocationCards = () => {
//         if (!cardContainerRef.current || !carouselIndicatorsRef.current || popUps.length === 0) return;
//         cardContainerRef.current.innerHTML = '';
//         carouselIndicatorsRef.current.innerHTML = '';

//         popUps.forEach((location, index) => {
//             const card = document.createElement('div');
//             card.className = 'location-card';
//             if (isPlannerMode) card.classList.add('day-planner-card');
//             if (index === 0) card.classList.add('card-active');

//             const imageUrl = getPlaceholderImage(location.name);
//             let cardContent = `<div class="card-image" style="background-image: url('${imageUrl}')"></div>`;

//             if (isPlannerMode) {
//                 if (location.sequence) {
//                     cardContent += `<div class="card-sequence-badge">${location.sequence}</div>`;
//                 }
//                 if (location.time) {
//                     cardContent += `<div class="card-time-badge">${location.time}</div>`;
//                 }
//             }

//             cardContent += `
//         <div class="card-content">
//           <h3 class="card-title">${location.name}</h3>
//           <p class="card-description">${location.description}</p>
//           ${isPlannerMode && location.duration ? `<div class="card-duration">${location.duration}</div>` : ''}
//           <div class="card-coordinates">
//             ${location.position.lat().toFixed(5)}, ${location.position.lng().toFixed(5)}
//           </div>
//         </div>
//       `;
//             card.innerHTML = cardContent;

//             card.addEventListener('click', () => {
//                 highlightCard(index);
//                 map.panTo(location.position);
//                 if (isPlannerMode && timelineRef.current) highlightTimelineItem(index);
//             });

//             cardContainerRef.current.appendChild(card);

//             const dot = document.createElement('div');
//             dot.className = 'carousel-dot';
//             if (index === 0) dot.classList.add('active');
//             carouselIndicatorsRef.current.appendChild(dot);
//         });
//     };

//     // Highlights the selected card and corresponding elements
//     const highlightCard = (index) => {
//         setActiveCardIndex(index);
//         const cards = cardContainerRef.current?.querySelectorAll('.location-card');
//         if (!cards) return;

//         cards.forEach((card) => card.classList.remove('card-active'));
//         if (cards[index]) {
//             cards[index].classList.add('card-active');
//             const cardWidth = cards[index].offsetWidth;
//             const containerWidth = cardContainerRef.current.offsetWidth;
//             const scrollPosition =
//                 cards[index].offsetLeft - containerWidth / 2 + cardWidth / 2;
//             cardContainerRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
//         }

//         const dots = carouselIndicatorsRef.current?.querySelectorAll('.carousel-dot');
//         if (dots) {
//             dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
//         }

//         popUps.forEach((popup, i) => {
//             popup.popup.setMap(isPlannerMode ? (i === index ? map : null) : map);
//             if (popup.content) {
//                 popup.content.classList.toggle('popup-active', i === index);
//             }
//         });

//         if (isPlannerMode) highlightTimelineItem(index);
//     };
//     // Highlights the timeline item corresponding to the selected card
//     const highlightTimelineItem = (cardIndex) => {
//         if (!timelineRef.current) return;
//         const timelineItems = timelineRef.current.querySelectorAll(
//             '.timeline-content:not(.transport)',
//         );
//         timelineItems.forEach((item) => item.classList.remove('active'));

//         const location = popUps[cardIndex];
//         for (const item of timelineItems) {
//             const title = item.querySelector('.timeline-title');
//             if (title && title.textContent === location.name) {
//                 item.classList.add('active');
//                 item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
//                 break;
//             }
//         }
//     };

//     // Allows navigation through cards using arrow buttons
//     const navigateCards = (direction) => {
//         const newIndex = activeCardIndex + direction;
//         if (newIndex >= 0 && newIndex < popUps.length) {
//             highlightCard(newIndex);
//             map.panTo(popUps[newIndex].position);
//         }
//     };

//     // Exports the current day plan as a simple text file
//     const exportDayPlan = () => {
//         if (!dayPlanItinerary.length) return;
//         let content = '# Your Day Plan\n\n';

//         dayPlanItinerary.forEach((item, index) => {
//             content += `## ${index + 1}. ${item.name}\n`;
//             content += `Time: ${item.time || 'Flexible'}\n`;
//             if (item.duration) content += `Duration: ${item.duration}\n`;
//             content += `\n${item.description}\n\n`;

//             if (index < dayPlanItinerary.length - 1) {
//                 const nextItem = dayPlanItinerary[index + 1];
//                 const connectingLine = lines.find(
//                     (line) =>
//                         line.name.includes(item.name) || line.name.includes(nextItem.name),
//                 );
//                 if (connectingLine) {
//                     content += `### Travel to ${nextItem.name}\n`;
//                     content += `Method: ${connectingLine.transport || 'Not specified'}\n`;
//                     if (connectingLine.travelTime) {
//                         content += `Time: ${connectingLine.travelTime}\n`;
//                     }
//                     content += `\n`;
//                 }
//             }
//         });

//         const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = 'day-plan.txt';
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//         URL.revokeObjectURL(url);
//     };

//     // Initialize event listeners for key elements
//     useEffect(() => {
//         if (prevCardButton.current) {
//             prevCardButton.current.addEventListener('click', () => {
//                 navigateCards(-1);
//             });
//         }

//         if (nextCardButton.current) {
//             nextCardButton.current.addEventListener('click', () => {
//                 navigateCards(1);
//             });
//         }

//         if (plannerModeToggle.current) {
//             plannerModeToggle.current.addEventListener('change', () => {
//                 setIsPlannerMode(plannerModeToggle.current.checked);
//                 if (promptInput.current) {
//                     promptInput.current.placeholder = isPlannerMode
//                         ? "Create a day plan in... (e.g. 'Plan a day exploring Central Park' or 'One day in Paris')"
//                         : 'Explore places, history, events, or ask about any location...';
//                 }

//                 if (!isPlannerMode && timelineContainer.current) {
//                     hideTimeline();
//                 }
//             });
//         }

//         if (closeTimelineButton.current) {
//             closeTimelineButton.current.addEventListener('click', () => {
//                 hideTimeline();
//             });
//         }

//         if (timelineToggle.current) {
//             timelineToggle.current.addEventListener('click', () => {
//                 showTimeline();
//             });
//         }

//         if (mapOverlay.current) {
//             mapOverlay.current.addEventListener('click', () => {
//                 hideTimeline();
//             });
//         }

//         if (exportPlanButton.current) {
//             exportPlanButton.current.addEventListener('click', () => {
//                 exportDayPlan();
//             });
//         }

//         return () => {
//             // Clean up event listeners when component unmounts
//             if (prevCardButton.current) {
//                 prevCardButton.current.removeEventListener('click', () => navigateCards(-1));
//             }
//             if (nextCardButton.current) {
//                 nextCardButton.current.removeEventListener('click', () => navigateCards(1));
//             }
//             // Continue with other cleanup...
//         };
//     }, [isPlannerMode]);

//     // Handle keyboard navigation through cards
//     useEffect(() => {
//         const handleKeyDown = (e) => {
//             if (e.key === 'ArrowLeft') {
//                 navigateCards(-1);
//             } else if (e.key === 'ArrowRight') {
//                 navigateCards(1);
//             }
//         };

//         window.addEventListener('keydown', handleKeyDown);
//         return () => {
//             window.removeEventListener('keydown', handleKeyDown);
//         };
//     }, []);

//     // Handle prompt input and submission
//     useEffect(() => {
//         if (promptInput.current) {
//             const handleInputKeyDown = (e) => {
//                 if (e.key === 'Enter' && !e.shiftKey) {
//                     // Allow shift+enter for new lines
//                     const buttonEl = generateButton.current;
//                     if (buttonEl) {
//                         buttonEl.classList.add('loading');
//                     }
//                     e.preventDefault();
//                     e.stopPropagation();

//                     setTimeout(() => {
//                         sendText(promptInput.current.value);
//                         promptInput.current.value = '';
//                     }, 10); // Delay to show loading state
//                 }
//             };

//             promptInput.current.addEventListener('keydown', handleInputKeyDown);
//             return () => {
//                 promptInput.current.removeEventListener('keydown', handleInputKeyDown);
//             };
//         }
//     }, []);

//     // Handle generate button click
//     useEffect(() => {
//         if (generateButton.current) {
//             const handleGenerateClick = (e) => {
//                 const buttonEl = e.currentTarget;
//                 buttonEl.classList.add('loading');

//                 setTimeout(() => {
//                     if (promptInput.current) {
//                         sendText(promptInput.current.value);
//                     }
//                 }, 10);
//             };

//             generateButton.current.addEventListener('click', handleGenerateClick);
//             return () => {
//                 generateButton.current.removeEventListener('click', handleGenerateClick);
//             };
//         }
//     }, []);

//     // Handle reset button click
//     useEffect(() => {
//         if (resetButton.current) {
//             resetButton.current.addEventListener('click', restart);
//             return () => {
//                 resetButton.current.removeEventListener('click', restart);
//             };
//         }
//     }, []);

//     // Initialize the map when component mounts
//     useEffect(() => {
//         initMap();

//         // Handle window resize for responsive layout
//         const handleResize = () => {
//             if (bounds && map) {
//                 setTimeout(() => {
//                     map.fitBounds(bounds);
//                 }, 100);
//             }
//         };

//         window.addEventListener('resize', handleResize);
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     return (
//         <div className="map-explorer">
//             {/* Map container */}
//             <div id="map-container" className="map-container" ref={mapContainer}>
//                 <div id="map" ref={mapRef}></div>

//                 {/* Search container */}
//                 <div className="search-container">
//                     {/* Mode toggle switch */}
//                     <div className="mode-toggle">
//                         <label className="switch">
//                             <input
//                                 type="checkbox"
//                                 id="planner-mode-toggle"
//                                 ref={plannerModeToggle}
//                             />
//                             <span className="slider round"></span>
//                         </label>
//                         <span className="mode-label">Day Planner Mode</span>
//                     </div>

//                     {/* Search bar */}
//                     <div className="search-bar">
//                         <i className="fas fa-search search-icon"></i>
//                         <textarea
//                             id="prompt-input"
//                             placeholder="Explore places, history, events, or routes..."
//                             ref={promptInput}
//                         ></textarea>
//                         <button id="generate" className="search-button" ref={generateButton}>
//                             <i className="fas fa-arrow-right"></i>
//                             <div className="spinner"></div>
//                         </button>
//                     </div>

//                     {/* Error message display */}
//                     <div className="error" id="error-message" ref={errorMessage}></div>
//                 </div>

//                 {/* Location cards carousel */}
//                 <div className="card-carousel" ref={cardCarousel}>
//                     <div className="card-container" id="card-container" ref={cardContainer}>
//                         {/* Cards will be inserted dynamically */}
//                     </div>
//                     <div className="carousel-controls">
//                         <button className="carousel-arrow prev" id="prev-card" ref={prevCardButton}>
//                             <i className="fas fa-chevron-left"></i>
//                         </button>
//                         <div className="carousel-indicators" id="carousel-indicators" ref={carouselIndicators}>
//                             {/* Indicator dots will be added dynamically */}
//                         </div>
//                         <button className="carousel-arrow next" id="next-card" ref={nextCardButton}>
//                             <i className="fas fa-chevron-right"></i>
//                         </button>
//                     </div>
//                 </div>

//                 {/* Reset button */}
//                 <button id="reset" className="reset-button" ref={resetButton}>
//                     <i className="fas fa-undo"></i>
//                 </button>
//             </div>

//             {/* Map overlay for mobile view */}
//             <div className="map-overlay" id="map-overlay" ref={mapOverlay}></div>

//             {/* Timeline container */}
//             <div className="timeline-container" id="timeline-container" ref={timelineContainer}>
//                 <button id="timeline-toggle" className="timeline-toggle" ref={timelineToggle}>
//                     <i className="fas fa-calendar-alt"></i>
//                 </button>

//                 <div className="timeline-header">
//                     <h3>Your Day Plan</h3>
//                     <div className="timeline-actions">
//                         <button id="export-plan" className="export-button" ref={exportPlanButton}>
//                             <i className="fas fa-download"></i> Export
//                         </button>
//                         <button id="close-timeline" className="close-button" ref={closeTimelineButton}>
//                             <i className="fas fa-times"></i>
//                         </button>
//                     </div>
//                 </div>
//                 <div className="timeline" id="timeline" ref={timelineRef}>
//                     {/* Timeline items will be inserted dynamically */}
//                 </div>
//             </div>

//             {/* Loading spinner */}
//             <div id="spinner" className="hidden spinner" ref={spinner}></div>
//         </div>
//     );
// }