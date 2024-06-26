# P1DAAF

![TypeScript](https://img.shields.io/badge/TypeScript-blue)
![Node.js](https://img.shields.io/badge/TS--Node-blue)
![License](https://img.shields.io/badge/License-MIT-blue)

Hello and Welcome to our Quiz App! Built with typescript, node deployed on AWS. Tested with POSTMAN

A RESTful API built with TypeScript and Node.js for managing a bank of questions. This API allows users to check, add, edit, and delete questions. It is tested using Postman.

## Table of Contents

- [Functionality](#functionality)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Functionality

- See all questions
- See a random question
- Create a question
- Delete a question
- Favourite and unfavourite a question
- Edit a question
- See a filtered question by category, difficulty, ID or if favourited.

## Installation

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/fac29/P1DAAF-Backend.git
    cd P1DAAF-Backend
    ```

2.  **Install dependencies:**

    ```sh
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root directory and add your configuration settings.

    ```env
    PORT=3000
    ```
    
## Usage

### Running the Server

To start the server, use the following command:

```sh
npm run dev
```

The server will run on the port specified in the `.env` file. If no port is specified, it will default to `3000`.

### API Endpoints

#### Get all questions

```http
GET http://localhost:3000/
```

#### Get random question/questions

```http
GET http://localhost:3000/random/:Quantity
```

#### Get a single question by ID

```http
GET http://localhost:3000/get-question-by-id/:QuestionID
```

#### Add a new question

```http
POST http://localhost:3000/create-question/
```

**Request Body:**

```json
{
  "id": 704,
  "category": "History",
  "difficulty": "easy",
  "question": "When was Princess Diana Born?",
  "options": ["01/07/1998", "07/07/1998", "02/02/1961", "09/09/1990"],
  "answer": "07/07/1998",
  "favourited": true,
  "timestamp": "2023-01-01T00:00:00Z"
}
```

#### Edit a question

Use a question that exists in the database already but use the format as below.

```http
PUT http://localhost:3000/edit-question
```

**Request Body:**

```json
{
  "id": 704,
  "category": "History",
  "difficulty": "easy",
  "question": "When was Princess Diana Born?",
  "options": ["01/07/1998", "07/07/1998", "02/02/1961", "09/09/1990"],
  "answer": "07/07/1998",
  "favourited": true,
  "timestamp": "2023-01-01T00:00:00Z"
}
```

#### Delete a question

```http
DELETE http://localhost:3000/delete-post/:QuestionID
```

#### Filter questions

```http
GET http://localhost:3000/filter/:category/:difficulty
```

## Testing

To test the API endpoints, you can use [Postman](https://www.postman.com/).

1. Import the Postman collection provided in the repository.
2. Run the requests to test various endpoints.

## Here is a flow of the user journey:

```mermaid

flowchart TD
    A[homepage] -.-|
    can start here
    add/delete a question
    see favourites| B[question bank]
    A --> |can start here
    start a session|C{filter option}
    C --> D[Difficulty]
    C --> E[Category]
    C --> F[Favourites]
    C --> G[Random]
    D --> H(quiz session
    60 secs)
    style H fill:#f9f,stroke:#333,stroke-width:4px
    H-.-|favourite a question| B
    E --> H
    F --> H
    G --> H(quiz session
    10 Qs)


    H --> I[summary of results]
    I -->|END of cycle
    nack home| A

```

The user is able to filter questions by difficult, topic, favourites or just see random questions.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
Generate Private keys for HTTPS:
On the project root execute:

## Instructions to use HTTPS locally

Create folders "keys/certs" on the root
mkdir -p keys/certs

openssl genpkey -algorithm RSA -out keys/selfsigned.key
openssl req -new -key keys/selfsigned.key -out keys/selfsigned.csr
openssl x509 -req -in keys/selfsigned.csr -signkey keys/selfsigned.key -out keys/certs/selfsigned.crt -days 365

Common Name:
on the ec2 instance is the IP address: 18.175.120.83
for local testing: localhost

For easy update the code on the EC2 instance without losing the keys folder add it to the local exclude:
nano .git/info/exclude

    Add there:
        keys/
