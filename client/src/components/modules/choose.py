import os
import random
    # Folder where the images are stored
folder_path = "client/public/trees"

# List all image files in the folder
images = [f for f in os.listdir(folder_path) if f.endswith(('jpg', 'jpeg', 'png'))]

# Randomly select an image
random_image = random.choice(images)

# Print or use the selected image