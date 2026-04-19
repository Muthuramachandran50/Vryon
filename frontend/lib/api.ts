export async function tryOnProduct(personImage: File, clothingImageUrl: string) {
    // We need to fetch the clothing image from the URL to send it as a file, 
    // OR the backend should handle URLs. 
    // For this MVP, let's fetch the clothing image blob client-side to simplify backend upload logic 
    // (Backend expects 2 files).

    const clothingResponse = await fetch(clothingImageUrl);
    const clothingBlob = await clothingResponse.blob();

    const formData = new FormData();
    formData.append('person_image', personImage);
    formData.append('clothing_image', clothingBlob, 'clothing.jpg');

    const response = await fetch('http://localhost:8000/try-on', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Try-On failed');
    }

    const data = await response.json();
    // Backend returns relative path "/results/..."
    return `http://localhost:8000${data.result_url}`;
}
