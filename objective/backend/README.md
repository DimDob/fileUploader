# File Upload and Download Application

This Angular-based web application allows users to upload and download files to/from a server. The application provides functionalities to select files, upload them to the server, and retrieve files based on a user’s input. It also includes error handling and notifications to improve user experience.

## Features

- **File Upload**: Allows users to select and upload files to the server.
- **File Download**: Enables users to download files by providing specific file details.
- **User Authentication**: Works in conjunction with user management to ensure that files are tied to user actions.
- **Dialogs & Notifications**: Provides feedback through modals and snackbars for actions like file upload success or failure.

## Technologies Used

- **Frontend**: 
  - Angular 19
  - Angular Material 
  - RxJS
  - HTTP Client 
  - FormsModule

- **Backend**:
  - RESTful APIs
  - Endpoints for uploading and downloading revision files

- **Database**:
  -*PostgreSQL 16.1, compiled by Visual C++ build 1937, 64-bit* - you could download it from here: https://www.postgresql.org/download/windows/

## Setup & Installation
### Prerequisites

In order to run the app you have to install the following tools: 

- **Node.js**
- **Angular CLI**: To install Angular CLI globally, run the following command:
  ```bash
  npm install -g @angular/cli
  ```

### Clone the Repository

Clone this repository to your local machine:
```bash
git clone https://github.com/DimDob/fileUploader.git
```

### Install Dependencies

Navigate to the project directory and install the required dependencies (they are in requirements.txt):

```bash
cd fileUploader/objective/backend 
pip3 install -r requirements.txt

```

### RUNNING BACKEND & API

Make sure the backend server is running. In order to run the backend you could try to do it with
*docker-compose up --build / docker-compose -d*, because i've deployed them into separate docker containers.
** If the docker containers won't start, then you could do it directly in the terminal using *python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000*

### Running the DB

If PostgreSQL docker container doesn't build successfully, then you must install PostgreSQL locally, the version is *PostgreSQL 16.1, compiled by Visual C++ build 1937, 64-bit* - you could download it from here: https://www.postgresql.org/download/windows/

### BUILDING FRONTEND

Once you have installed all the dependencies and successfully built the BE, you can run the FE against the BE using:

```bash
ng serve
```

Visit `http://localhost:4200` in your browser to access the app.

## Usage

### File Upload

1. Click the "Upload File" button to open the file dialog.
2. Select a file from your local machine.
3. After selecting the file, click the "Upload" button.
4. If the upload is successful, you will receive a success alert with the file name.
5. If the upload fails, an error alert will notify you.

### File Download

1. Click the "Receive File" button to open the file selection dialog.
2. Select a file from the available files.
3. The file will be downloaded automatically. A success message will show up once the download is complete.
4. If the file is not found, an error alert will notify you.

## Code Structure

- **app**:
  - `upload-file.component.ts`: Handles file selection and upload logic.
  - `receive-file.component.ts`: Handles file selection and download logic.
  - `file-operations.service.ts`: Contains methods for interacting with the backend API for file upload and download.
  - `dialog-overview.component.ts`: Displays file details in a dialog box.
  
- **interfaces**:
  - `file_interface.ts`: Defines types for file details, including filename, revision, and other metadata.
  - `user_interface.ts` : Defines a custom user until JWT is implemented