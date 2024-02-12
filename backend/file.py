from PIL import Image

def preprocess_image(image_path, target_size):
    image = Image.open(image_path)
    image = image.resize(target_size)
    # Convert to grayscale or RGB based on your requirements
    image = image.convert('RGB')
    return image
#training the model
from keras.models import Sequential
from keras.layers import Conv2D, MaxPooling2D, Flatten, Dense

# Build the model
model = Sequential()
model.add(Conv2D(32, (3, 3), activation='relu', input_shape=(width, height, channels)))
# Add more convolutional and pooling layers as needed
model.add(Flatten())
model.add(Dense(128, activation='relu'))
model.add(Dense(1, activation='sigmoid'))

# Compile the model
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Train the model
model.fit(X_train, y_train, epochs=10, batch_size=32, validation_data=(X_val, y_val))
