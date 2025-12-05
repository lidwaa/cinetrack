import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, authState, User as FirebaseUser, updateProfile } from '@angular/fire/auth';
import { BehaviorSubject, Observable, from, map } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private auth = inject(Auth);
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor() {
        // Listen to Firebase auth state changes
        authState(this.auth).subscribe((firebaseUser: FirebaseUser | null) => {
            if (firebaseUser) {
                const user: User = {
                    id: firebaseUser.uid,
                    email: firebaseUser.email || '',
                    name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User'
                };
                this.currentUserSubject.next(user);
            } else {
                this.currentUserSubject.next(null);
            }
        });
    }

    register(userData: { email: string; password: string; name: string }): Observable<any> {
        return from(
            createUserWithEmailAndPassword(this.auth, userData.email, userData.password)
                .then(async (credential) => {
                    // Update display name
                    if (credential.user) {
                        await updateProfile(credential.user, { displayName: userData.name });
                    }
                    return { success: true, user: credential.user };
                })
        );
    }

    login(credentials: { email: string; password: string }): Observable<any> {
        return from(
            signInWithEmailAndPassword(this.auth, credentials.email, credentials.password)
                .then((credential) => {
                    return { success: true, user: credential.user };
                })
        );
    }

    logout(): Observable<void> {
        return from(signOut(this.auth));
    }

    get currentUserValue(): User | null {
        return this.currentUserSubject.value;
    }
}
