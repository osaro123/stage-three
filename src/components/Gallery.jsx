import React, { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.jpg";
import image5 from "../assets/image5.jpg";
import image6 from "../assets/image6.jpg";

const Gallery = () => {
    const [isLoading, setIsLoading] = useState(true); // Set initial loading state to true
    const [images, setImages] = useState([
        { id: 'image1', url: image1, tag: "motorcycle", colSpan: 1, rowSpan: 1 },
        { id: 'image2', url: image2, tag: "typing", colSpan: 2, rowSpan: 1 },
        { id: 'image3', url: image3, tag: "art", colSpan: 1, rowSpan: 1 },
        { id: 'image4', url: image4, tag: "model", colSpan: 1, rowSpan: 2 },
        { id: 'image5', url: image5, tag: "building", colSpan: 1, rowSpan: 1 },
        { id: 'image6', url: image6, tag: "street", colSpan: 2, rowSpan: 1 },
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    // Simulate image loading
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false); // Set loading state to false after 2 seconds (simulating image loading)
        }, 2000);
    }, []);

    const handleDragEnd = (result) => {
        if (!result.destination) return; // Dragged outside of the list, ignore

        const newImages = [...images];
        const [reorderedItem] = newImages.splice(result.source.index, 1); // Remove the dragged item
        newImages.splice(result.destination.index, 0, reorderedItem); // Add it back at the new position

        setImages(newImages);
    };

    // Filter images by tag
    const filteredImages = images.filter((image) =>
        image.tag.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {isLoading ? (
                <div className="text-center py-4">
                    <p>Loading...</p>
                </div>
            ) : (
                <>
                    <input
                        type="text"
                        placeholder="Search by tag"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 mb-4 border rounded"
                    />
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId='images'>
                            {(provided) => (
                                <div
                                    className={`images grid sm:grid-cols-3 grid-cols-1 gap-4`}
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {filteredImages.map((image, index) => (
                                        <Draggable
                                            key={image.id}
                                            draggableId={image.id}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <div
                                                        key={image.id}
                                                        className={`relative col-span-${image.colSpan} row-span-${image.rowSpan} h-[400px]`}
                                                    >
                                                        <img
                                                            src={image.url}
                                                            alt={image.tag}
                                                            className='w-full h-full object-cover'
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </>
            )}
        </div>
    );
};

export default Gallery;
