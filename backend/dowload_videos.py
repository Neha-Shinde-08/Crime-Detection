import requests
import cv2
import os

def download_video(url, filename):
    chunk_size = 256
    try:
        r = requests.get(url, stream=True)
        with open(filename, "wb") as f:
            for chunk in r.iter_content(chunk_size=chunk_size):
                f.write(chunk)
        print(f"Video downloaded successfully as {filename}")
        return True
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return False

def split_video_into_frames(video_path):
    try:
        # Open the video file
        cap = cv2.VideoCapture(video_path)
        # Create a folder based on the video title
        folder_name = os.path.splitext(os.path.basename(video_path))[0]
        os.makedirs(folder_name, exist_ok=True)
        
        # Calculate total number of frames
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        # Calculate interval to get 15 frames (excluding first and last frames)
        interval = max((total_frames - 2) // 14, 1)
        
        # Read frames from the video and save selected frames
        frame_count = 0
        while True:
            ret, frame = cap.read()
            if not ret:
                break
            frame_count += 1
            # Skip the first and last frames
            if frame_count == 1 or frame_count == total_frames:
                continue
            # Check if the current frame is a selected frame
            if (frame_count - 1) % interval == 0:
                frame_filename = os.path.join(folder_name, f"frame_{frame_count:04d}.jpg")
                cv2.imwrite(frame_filename, frame)
                if frame_count == total_frames - 1:  # Stop when 15 frames are saved
                    break
        
        print(f"15 frames extracted and saved in {folder_name} folder")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

# Example usage:
url = "https://dms.licdn.com/playlist/vid/C560DAQFTgNT2Wg5u4g/learning-original-video-vbr-540/0/1599179708313?e=2147483647&v=beta&t=cP5YlgAfMMWqq2Zdrz_H9Yvr93fUB73wTU98baVz-Jk#.mp4"
filename = "lynda.mp4"
if download_video(url, filename):
    split_video_into_frames(filename)
