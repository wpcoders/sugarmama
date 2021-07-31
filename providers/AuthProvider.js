import React, { useState, useEffect, createContext } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import { showMessage } from "react-native-flash-message";

export const AuthContext = React.createContext();

export function AuthProvider(props) {
	const [initializing, setInitializing] = React.useState(true);
	const [user, setUser] = React.useState();
	const [isLoading, setIsLoading] = useState(false);

	async function onAuthStateChanged(user) {
		// console.log(user);
		setUser(user);
		if (initializing) setInitializing(false);
	}

	function signIn(email, password) {
		setIsLoading(true);
		auth()
			.signInWithEmailAndPassword(email, password)
			.then(async (res) => {
				if (!res.user.emailVerified) {
					await sendVerificationEmail();
					showMessage({
						message: "Email not verified",
						description: "We have sent a verification link to your email",
						type: "warning",
						duration: 5000,
						titleProps: "OK",
					});
				} else {
					setUser(res.user);
				}
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
				showMessage({
					message: err.message,
					type: "danger",
					duration: 5000,
					titleProps: "OK",
				});
				setIsLoading(false);
			});
	}

	async function signUp(email, password) {
		try {
			setIsLoading(true);
			const user = await auth().createUserWithEmailAndPassword(email, password);
			await auth().currentUser.sendEmailVerification();
			showMessage({
				message: "Account created successfully",
				description: "We have sent a verification link to your email",
				type: "success",
				duration: 5000,
				titleProps: "OK",
			});
			setIsLoading(false);
			return Promise.resolve(user);
		} catch (error) {
			showMessage({
				message: error.message,
				type: "danger",
				duration: 5000,
				titleProps: "OK",
			});
			setIsLoading(false);
		}
	}

	function signOut() {
		auth()
			.signOut()
			.then(() => {
				console.log("Sign out");
			});
	}

	async function resetPassword(email) {
		setIsLoading(true);
		try {
			const sentEmail = await auth().sendPasswordResetEmail(email);
			setIsLoading(false);
			showMessage({
				message: "Password reset",
				description: "We have sent a reset link to your email",
				type: "success",
				duration: 5000,
				titleProps: "OK",
			});
		} catch (error) {
			setIsLoading(false);
			showMessage({
				message: error.message,
				type: "danger",
				duration: 5000,
				titleProps: "OK",
			});
		}
	}

	async function sendVerificationEmail() {
		await auth().currentUser.sendEmailVerification();
	}

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber; // unsubscribe on unmount
	}, []);

	return (
		<AuthContext.Provider
			value={{
				initializing,
				user,
				signUp,
				signOut,
				signIn,
				resetPassword,
				isLoading,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
}
