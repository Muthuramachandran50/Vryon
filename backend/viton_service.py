from gradio_client import Client, handle_file
import os
import shutil
import time

# Using a public space. IDM-VTON is a state-of-the-art model.
# We might need to handle queueing or potential errors if the space is busy.
# Alternative: "yisol/IDM-VTON"
GRADIO_SPACE = "yisol/IDM-VTON" 

import traceback

async def process_tryon(person_image_path: str, clothing_image_path: str) -> str:
    """
    Sends images to the Gradio space and returns the path to the generated image.
    """
    print(f"Connecting to Gradio Space: {GRADIO_SPACE}...")
    try:
        client = Client(GRADIO_SPACE)
        
        print("Sending request to model...")
        print(f"Person Image: {person_image_path}")
        print(f"Clothing Image: {clothing_image_path}")

        # The API signature for IDM-VTON can be tricky.
        # Ensure we are passing arguments correctly for the 'tryon' endpoint.
        # Based on recent usage of yisol/IDM-VTON:
        # fn_index=0 or api_name="/tryon"
        
        result = client.predict(
                dict={"background": handle_file(person_image_path), "layers": [], "composite": None},
                garm_img=handle_file(clothing_image_path),
                garment_des="A cool dress",
                is_checked=True, 
                is_checked_crop=False, 
                denoise_steps=30,
                seed=42,
                api_name="/tryon"
        )
        
        print(f"Raw Result received: {result}")
        
        # IDM-VTON usually returns a tuple of file paths
        output_image_path = result[0] 
        
        filename = f"tryon_{int(time.time())}.png"
        dest_path = os.path.join("results", filename)
        
        # Ensure output is copied
        shutil.copy(output_image_path, dest_path)
        print(f"Saved result to: {dest_path}")
        return dest_path

    except Exception as e:
        print("------------- VITON SERVICE ERROR -------------")
        print(f"Error Message: {str(e)}")
        print(traceback.format_exc())
        print("-----------------------------------------------")
        return None
