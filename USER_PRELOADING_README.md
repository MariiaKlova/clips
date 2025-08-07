# User Preloading from Firebase

This implementation provides a comprehensive solution for preloading user data from Firebase before launching the Angular app for authorized users.

## Features

- **Preloads user data** from Firebase Firestore before app bootstrap
- **Loading screen** displayed during initialization
- **User state management** with reactive observables
- **Automatic user data updates** when authentication state changes
- **Error handling** for failed data loading

## Architecture

### 1. UserInitService (`src/app/servises/user-init.service.ts`)
- Manages user data initialization
- Provides reactive user data stream
- Handles user data loading from Firestore
- Maintains user state across the application

### 2. Enhanced AuthService (`src/app/servises/auth.service.ts`)
- Integrates with UserInitService
- Automatically loads user data on authentication state changes
- Updates user data when new users are created
- Provides user data access methods

### 3. App Component (`src/app/app.component.ts`)
- Initializes user data on app startup
- Shows loading screen during initialization
- Handles initialization errors gracefully

### 4. Loading Component (`src/app/shared/loading/loading.component.ts`)
- Displays loading spinner with customizable message
- Full-screen overlay during app initialization
- Modern, responsive design

## Usage

### Basic Usage

```typescript
// In any component
import { UserInitService } from '../servises/user-init.service';

export class MyComponent {
  userData$ = this.userInitService.userData$;
  
  constructor(private userInitService: UserInitService) {}
  
  // Get current user data
  getCurrentUser() {
    return this.userInitService.getCurrentUser();
  }
}
```

### Template Usage

```html
<!-- Display user information -->
<div *ngIf="userData$ | async as user">
  <h2>Welcome, {{ user.name }}!</h2>
  <p>Email: {{ user.email }}</p>
  <p>Age: {{ user.age }}</p>
</div>

<!-- Show loading state -->
<app-loading [isLoading]="isLoading" message="Loading user data..."></app-loading>
```

### Manual User Data Loading

```typescript
// Manually initialize user data
const userData = await this.userInitService.initializeUserData();

// Wait for user data to be available
const user = await this.userInitService.waitForUserData();
```

## Data Flow

1. **App Startup**: `main.ts` waits for Firebase auth state
2. **User Detection**: If user is authenticated, preloads user data from Firestore
3. **App Bootstrap**: Angular app starts with user data already available
4. **Loading Screen**: Shows during the entire process
5. **User State**: Reactive stream provides user data throughout the app

## User Model

```typescript
interface IUser {
  email: string;
  password?: string;
  name: string;
  age: number;
  phoneNumber: string;
  uid?: string;
  createdAt?: Date;
}
```

## Error Handling

The implementation includes comprehensive error handling:

- **Network errors** during Firestore queries
- **Authentication errors** during user state changes
- **Data loading failures** with fallback behavior
- **Graceful degradation** when user data is unavailable

## Benefits

1. **Improved UX**: No loading delays after app starts
2. **Better Performance**: User data available immediately
3. **Consistent State**: Single source of truth for user data
4. **Reactive Updates**: Automatic updates when user data changes
5. **Error Resilience**: Graceful handling of failures

## Configuration

The implementation uses the existing Firebase configuration from `environment.ts`. Ensure your Firebase project has:

- Authentication enabled
- Firestore database with `users` collection
- Proper security rules for user data access

## Security Considerations

- User data is only loaded for authenticated users
- Firestore security rules should restrict access to user's own data
- Sensitive data (like passwords) are not stored in user documents
- Authentication state is verified before data loading
