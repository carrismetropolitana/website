'use client';

import { IconHome, IconMinus, IconPlus } from '@tabler/icons-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { BEACH_PINS } from '../constants';
import { MapLayers } from './';

export interface DraggableMapLayersProps {
	bounds?: {
		maxX?: number
		maxY?: number
		minX?: number
		minY?: number
	}
	enableDoubleClickReset?: boolean
	onDragMove?: (offset: { x: number, y: number }) => void
	onPinClick?: (beachId: string) => void
	selectedAccordionId?: string
	selectedLineId?: null | string
	style?: React.CSSProperties
}

export function DraggableMapLayers({
	enableDoubleClickReset = true,
	onDragMove,
	onPinClick,
	selectedAccordionId,
	selectedLineId,
	style,
}: DraggableMapLayersProps) {
	const [isDragging, setIsDragging] = useState(false);
	const [offset, setOffset] = useState({ x: 0, y: 0 });
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [zoomStart, setZoomStart] = useState(1);
	const [isMouseInside, setIsMouseInside] = useState(false);
	const [hasManuallyInteracted, setHasManuallyInteracted] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const MIN_ZOOM = 1;
	const MAX_ZOOM = 3;

	const getOptimalViewForAccordion = useCallback((accordionId: string) => {
		const viewConfigs = {
			'praia-albarquel': { x: -80, y: 20, zoom: 1.3 },
			'praia-creiro': { x: 120, y: -100, zoom: 1.5 },
			'praia-figueirinha': { x: -20, y: -50, zoom: 1.3 },
			'praia-galapos-galapinhos': { x: 80, y: -120, zoom: 1.5 },
		};

		return viewConfigs[accordionId as keyof typeof viewConfigs] || { x: 0, y: 0, zoom: 1.2 };
	}, []);

	const getOptimalViewForLine = useCallback((lineId: string) => {
		const viewConfigs = {
			4414: { x: -60, y: 10, zoom: 1.2 },
			4415: { x: -60, y: 10, zoom: 1.2 },
			4470: { x: 20, y: -30, zoom: 1.1 },
			4471: { x: -40, y: 0, zoom: 1.3 },
			4474: { x: -70, y: 20, zoom: 1.2 },
			4477: { x: 30, y: -60, zoom: 1.4 },
		};

		return viewConfigs[lineId as unknown as keyof typeof viewConfigs] || { x: 0, y: 0, zoom: 1.2 };
	}, []);

	const calculateZoomBounds = useCallback(() => {
		if (!containerRef.current) return { maxX: 100, maxY: 100, minX: -100, minY: -100 };

		const container = containerRef.current;
		const containerWidth = container.clientWidth;
		const containerHeight = container.clientHeight;

		const svgViewBoxWidth = 1798;
		const svgViewBoxHeight = 1312;
		const svgAspectRatio = svgViewBoxWidth / svgViewBoxHeight;
		const containerAspectRatio = containerWidth / containerHeight;

		let renderedHeight, renderedWidth;

		if (containerAspectRatio > svgAspectRatio) {
			renderedWidth = containerWidth;
			renderedHeight = renderedWidth / svgAspectRatio;
		}
		else {
			renderedHeight = containerHeight;
			renderedWidth = renderedHeight * svgAspectRatio;
		}

		const zoomedWidth = renderedWidth * zoom;
		const zoomedHeight = renderedHeight * zoom;

		const extraWidth = Math.max(0, zoomedWidth - containerWidth);
		const extraHeight = Math.max(0, zoomedHeight - containerHeight);

		return {
			maxX: extraWidth / 2,
			maxY: extraHeight / 2,
			minX: -extraWidth / 2,
			minY: -extraHeight / 2,
		};
	}, [zoom]);

	const constrainOffset = useCallback((newOffset: { x: number, y: number }) => {
		const zoomBounds = calculateZoomBounds();

		return {
			x: Math.max(
				zoomBounds.minX,
				Math.min(zoomBounds.maxX, newOffset.x),
			),
			y: Math.max(
				zoomBounds.minY,
				Math.min(zoomBounds.maxY, newOffset.y),
			),
		};
	}, [calculateZoomBounds]);

	const handleMouseDown = useCallback((e: React.MouseEvent) => {
		setIsDragging(true);
		setDragStart({
			x: e.clientX - offset.x,
			y: e.clientY - offset.y,
		});
		e.preventDefault();
	}, [offset]);

	const handleMouseMove = useCallback((e: React.MouseEvent) => {
		if (!isDragging) return;

		setHasManuallyInteracted(true);
		const newOffset = constrainOffset({
			x: e.clientX - dragStart.x,
			y: e.clientY - dragStart.y,
		});

		setOffset(newOffset);
		onDragMove?.(newOffset);
	}, [isDragging, dragStart, onDragMove, constrainOffset]);

	const handleMouseUp = useCallback(() => {
		setIsDragging(false);
	}, []);

	const handleMouseEnter = useCallback(() => {
		setIsMouseInside(true);
	}, []);

	const handleMouseLeave = useCallback(() => {
		setIsMouseInside(false);
		setIsDragging(false);
	}, []);

	const handleWheel = useCallback((e: React.WheelEvent) => {
		e.preventDefault();
		e.stopPropagation();

		setHasManuallyInteracted(true);
		const delta = e.deltaY > 0 ? 0.9 : 1.1;
		const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom * delta));

		if (newZoom !== zoom) {
			setZoom(newZoom);

			const rect = containerRef.current?.getBoundingClientRect();
			if (rect) {
				const mouseX = e.clientX - rect.left;
				const mouseY = e.clientY - rect.top;

				const scaleChange = newZoom / zoom;
				const newOffset = {
					x: mouseX - (mouseX - offset.x) * scaleChange,
					y: mouseY - (mouseY - offset.y) * scaleChange,
				};

				const constrainedOffset = constrainOffset(newOffset);
				setOffset(constrainedOffset);
				onDragMove?.(constrainedOffset);
			}
		}
	}, [zoom, offset, onDragMove, constrainOffset]);

	const handleTouchStart = useCallback((e: React.TouchEvent) => {
		if (e.touches.length === 1) {
			const touch = e.touches[0];
			setIsDragging(true);
			setDragStart({
				x: touch.clientX - offset.x,
				y: touch.clientY - offset.y,
			});
		}
		else if (e.touches.length === 2) {
			setZoomStart(zoom);
		}
		e.preventDefault();
	}, [offset, zoom]);

	const handleTouchMove = useCallback((e: React.TouchEvent) => {
		if (e.touches.length === 1 && isDragging) {
			const touch = e.touches[0];
			const newOffset = constrainOffset({
				x: touch.clientX - dragStart.x,
				y: touch.clientY - dragStart.y,
			});

			setOffset(newOffset);
			onDragMove?.(newOffset);
		}
		else if (e.touches.length === 2) {
			const touch1 = e.touches[0];
			const touch2 = e.touches[1];
			const distance = Math.sqrt(
				Math.pow(touch2.clientX - touch1.clientX, 2)
				+ Math.pow(touch2.clientY - touch1.clientY, 2),
			);

			const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoomStart * (distance / 100)));
			setZoom(newZoom);
		}
		e.preventDefault();
	}, [isDragging, dragStart, onDragMove, constrainOffset, zoomStart]);

	const handleTouchEnd = useCallback(() => {
		setIsDragging(false);
	}, []);

	const handleDoubleClick = useCallback(() => {
		if (enableDoubleClickReset) {
			setOffset({ x: 0, y: 0 });
			setZoom(1);
			setHasManuallyInteracted(false);
			onDragMove?.({ x: 0, y: 0 });
		}
	}, [enableDoubleClickReset, onDragMove]);

	useEffect(() => {
		const handleGlobalWheel = (e: WheelEvent) => {
			if (isMouseInside) {
				e.preventDefault();
				e.stopPropagation();
			}
		};

		document.addEventListener('wheel', handleGlobalWheel, { passive: false });

		return () => {
			document.removeEventListener('wheel', handleGlobalWheel);
		};
	}, [isMouseInside]);

	useEffect(() => {
		if ((selectedAccordionId || selectedLineId) && !hasManuallyInteracted) {
			const targetView = selectedLineId
				? getOptimalViewForLine(selectedLineId)
				: selectedAccordionId
					? getOptimalViewForAccordion(selectedAccordionId)
					: null;

			if (targetView) {
				const constrainedOffset = constrainOffset({ x: targetView.x, y: targetView.y });
				const constrainedZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, targetView.zoom));

				setOffset(constrainedOffset);
				setZoom(constrainedZoom);
				onDragMove?.(constrainedOffset);
			}
		}
	}, [selectedAccordionId, selectedLineId, hasManuallyInteracted, getOptimalViewForAccordion, getOptimalViewForLine, constrainOffset, onDragMove]);

	useEffect(() => {
		setHasManuallyInteracted(false);
	}, [selectedAccordionId]);

	useEffect(() => {
		const handleResize = () => {
			if (containerRef.current) {
				const constrainedOffset = constrainOffset(offset);
				setOffset(constrainedOffset);
				onDragMove?.(constrainedOffset);
			}
		};

		window.addEventListener('resize', handleResize);
		window.addEventListener('orientationchange', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('orientationchange', handleResize);
		};
	}, [offset, constrainOffset, onDragMove]);

	const wrapperStyle: React.CSSProperties = {
		backgroundColor: '#A6D4FF',
		cursor: isDragging ? 'grabbing' : 'grab',
		height: '100%',
		overflow: 'hidden',
		overscrollBehavior: 'contain',
		position: 'relative',
		touchAction: 'none',
		userSelect: 'none',
		width: '100%',
		...style,
	};

	const calculateImageStyle = useCallback((): React.CSSProperties => {
		if (!containerRef.current) {
			return {
				height: 'calc(100% + 500px)',
				position: 'absolute',
				width: 'calc(100% + 500px)',
				// should be the same as the minPadding
				display: 'block',
				left: '-20px',
				top: '-20px',
				transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
				transformOrigin: 'center center',
				transition: isDragging ? 'none' : 'transform 0.8s ease-out',
			};
		}

		const container = containerRef.current;
		const containerWidth = container.clientWidth;
		const containerHeight = container.clientHeight;

		const svgViewBoxWidth = 1798;
		const svgViewBoxHeight = 1312;
		const svgAspectRatio = svgViewBoxWidth / svgViewBoxHeight;
		const containerAspectRatio = containerWidth / containerHeight;

		let imageHeight, imageWidth, leftOffset, topOffset;

		// This basically defines the FOV of the map "camera"
		const minPadding = 20;

		if (containerAspectRatio > svgAspectRatio) {
			imageWidth = containerWidth + (minPadding * 2);
			imageHeight = imageWidth / svgAspectRatio;
			const minHeightPadding = Math.max(minPadding, (imageHeight - containerHeight) / 2);
			imageHeight = containerHeight + (minHeightPadding * 2);
			imageWidth = imageHeight * svgAspectRatio;
			leftOffset = -(imageWidth - containerWidth) / 2;
			topOffset = -(imageHeight - containerHeight) / 2;
		}
		else {
			imageHeight = containerHeight + (minPadding * 2);
			imageWidth = imageHeight * svgAspectRatio;
			const minWidthPadding = Math.max(minPadding, (imageWidth - containerWidth) / 2);
			imageWidth = containerWidth + (minWidthPadding * 2);
			imageHeight = imageWidth / svgAspectRatio;
			leftOffset = -(imageWidth - containerWidth) / 2;
			topOffset = -(imageHeight - containerHeight) / 2;
		}

		return {
			display: 'block',
			height: `${imageHeight}px`,
			left: `${leftOffset}px`,
			position: 'absolute',
			top: `${topOffset}px`,
			transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
			transformOrigin: 'center center',
			transition: isDragging ? 'none' : 'transform 0.8s ease-out',
			width: `${imageWidth}px`,
		};
	}, [offset.x, offset.y, zoom, isDragging]);

	const imageStyle = calculateImageStyle();

	const handlePinClick = (beachId: string) => {
		const pin = BEACH_PINS.find(p => p.id === beachId);
		if (pin) {
			onPinClick?.(pin.accordionId);
		}
	};

	return (
		<div
			ref={containerRef}
			onDoubleClick={handleDoubleClick}
			onMouseDown={handleMouseDown}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onTouchEnd={handleTouchEnd}
			onTouchMove={handleTouchMove}
			onTouchStart={handleTouchStart}
			onWheel={handleWheel}
			style={wrapperStyle}
		>
			<MapLayers
				onPinClick={handlePinClick}
				selectedAccordionId={selectedAccordionId}
				selectedLineId={selectedLineId}
				style={imageStyle}
			/>

			<div style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '5px',
				position: 'absolute',
				right: '10px',
				top: '10px',
				zIndex: 10,
			}}
			>
				<button
					title="Zoom In"
					onClick={() => {
						const newZoom = Math.min(MAX_ZOOM, zoom * 1.2);
						setZoom(newZoom);
					}}
					style={{
						alignItems: 'center',
						backgroundColor: 'rgba(255, 255, 255, 0.9)',
						border: 'none',
						borderRadius: '4px',
						color: '#333',
						cursor: 'pointer',
						display: 'flex',
						fontSize: '18px',
						height: '32px',
						justifyContent: 'center',
						width: '32px',
					}}
				>
					<IconPlus />
				</button>
				<button
					title="Zoom Out"
					onClick={() => {
						const newZoom = Math.max(MIN_ZOOM, zoom * 0.8);
						setZoom(newZoom);
					}}
					style={{
						alignItems: 'center',
						backgroundColor: 'rgba(255, 255, 255, 0.9)',
						border: 'none',
						borderRadius: '4px',
						color: '#333',
						cursor: 'pointer',
						display: 'flex',
						fontSize: '18px',
						height: '32px',
						justifyContent: 'center',
						width: '32px',
					}}
				>
					<IconMinus />
				</button>
				<button
					onClick={handleDoubleClick}
					title="Reset View"
					style={{
						alignItems: 'center',
						backgroundColor: 'rgba(255, 255, 255, 0.9)',
						border: 'none',
						borderRadius: '4px',
						color: '#333',
						cursor: 'pointer',
						display: 'flex',
						fontSize: '12px',
						height: '32px',
						justifyContent: 'center',
						width: '32px',
					}}
				>
					<IconHome />
				</button>
			</div>

			<div style={{
				backgroundColor: 'rgba(0, 0, 0, 0.7)',
				borderRadius: '4px',
				bottom: '10px',
				color: 'white',
				fontSize: '12px',
				padding: '4px 8px',
				position: 'absolute',
				right: '10px',
				zIndex: 10,
			}}
			>
				{Math.round(zoom * 100)}%
			</div>
		</div>
	);
}
