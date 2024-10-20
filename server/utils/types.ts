import { Request } from 'express';

// Exporting the User interface
export interface User {
    xata_id: string; // Unique identifier for the user in Xata
    role: string;    // User role (e.g., 'admin', 'user')
}

// Exporting the UserRequest interface
export interface UserRequest extends Request {
    user: User; // The user object should be present in the request
}

// Exporting the DecodedToken interface
export interface DecodedToken {
    id: string; // The user's ID from the JWT
}
