import React, {useState, useEffect, createContext, useContext} from "react";
import firestore from "@react-native-firebase/firestore";
import analytics from "@react-native-firebase/analytics";
import {AuthContext} from "./AuthProvider";
import {showMessage} from "react-native-flash-message";
import _ from 'lodash';

export const InitDataContext = createContext();

export function InitDataProvider(props) {
    const [demographic, setDemographic] = useState({date: new Date()});
    const [userProfile, setUserProfile] = useState(null);
    const [DESQuestions, setDESQuestions] = useState(undefined);
    const [DESAnswers, setDESAnswers] = useState(null);
    const [GDMKQQuestions, setGDMKQQuestions] = useState(undefined);
    const [GDMKQAnswers, setGDMKQAnswers] = useState(null);
    const [initialized, setInitialized] = useState(false);
    const [recentlyViewed, setRecentlyViewed] = useState([]);
    const [goals, setGoals] = useState([]);
    const [quickTips, setQuickTips] = useState(undefined);
    const [consentLink, setConsentLink] = useState("");

    const authContext = useContext(AuthContext);
    const {user} = authContext;

    // console.log("userProfile", userProfile);

    const getConsentLink = () => {
        firestore()
            .collection("static")
            .doc("consent")
            .get()
            .then((doc) => {
                setConsentLink(doc.data().link);
            })
            .catch((err) => console.log(err.message));
    };

    const addToRecentlyViewed = (module) => {
        const resultRecentlyViewd = _.filter(recentlyViewed, (viewedModule) => viewedModule.title !== module)
        if (resultRecentlyViewd.length < 100) {
            console.log([...resultRecentlyViewd, module].map((item) => item.title))
            setRecentlyViewed([...resultRecentlyViewd, module]);
        } else {
            const _recentlyViewed = resultRecentlyViewd;
            _recentlyViewed.pop();
            _recentlyViewed.unshift(module);
            setRecentlyViewed(_recentlyViewed);
        }
        firestore().collection("users").doc(user?.uid).update({
            recentlyViewed,
        });
    };

    const updateProfile = (name, value) => {
        setUserProfile({...userProfile, [name]: value});
        firestore()
            .collection("users")
            .doc(user?.uid)
            .update({
                [name]: value,
            });
    };

    const updateQuestionnaireResponse = () => {
        if (DESAnswers !== null && GDMKQAnswers !== null) {
            setUserProfile({...userProfile});
            firestore().collection("users").doc(user?.uid).update({
                DESAnswers,
                GDMKQAnswers,
            });
        }
    };

    const getUserGoals = () => {
        try {
            return firestore()
                .collection("users")
                .doc(user?.uid)
                .collection("goals")
                .onSnapshot((goals) => {
                    const array = [];
                    goals.forEach((goal) => {
                        array.push({id: goal.id, ...goal.data()});
                    });
                    setGoals([...array]);
                    // console.log("goals", array);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const addGoalToProfile = (moduleId, goal) => {
        if (goal) {
            analytics().logEvent(`goal_${moduleId}_added`);
            firestore()
                .collection("users")
                .doc(user?.uid)
                .collection("goals")
                .doc(moduleId)
                .set({goal, completed: false});
            const result = [];
            const map = new Map();
            if (!map.has(goal)) {
                map.set(goal, true);
                result.push({
                    goal: goal,
                    completed: false,
                });
            }
            for (const item of goals) {
                if (!map.has(item.goal)) {
                    map.set(item.goal, true); // set any value to Map
                    result.push({
                        goal: item.goal,
                        completed: item.completed,
                    });
                }
            }

            console.log(result);
            setGoals([...result]);
        }
    };

    const completeGoal = (goalId) => {
        const updatedGoal = goals.find((goal) => goal.id === goalId);
        const newGoals = goals.filter((goal) => goal.id !== goalId);
        setGoals([{...updatedGoal, completed: true}, ...newGoals]);
        analytics().logEvent(`goal_${updatedGoal}_completed`);
        firestore()
            .collection("users")
            .doc(user?.uid)
            .collection("goals")
            .doc(goalId)
            .update({completed: true});
    };

    const _setValue = (name, value) => {
        console.log(demographic);
        setDemographic({...demographic, [name]: value});
    };

    const getUserProfileAsync = async () => {
        try {
            const userProfile = await firestore()
                .collection("users")
                .doc(user?.uid)
                .get();
            // console.log("user", userProfile.data());
            if (userProfile.exists) {
                setUserProfile({
                    ...userProfile?.data(),
                    date: userProfile.data()?.date.toDate(),
                    alarms: {
                        breakfast: userProfile.data()?.alarms?.breakfast?.toDate(),
                        lunch: userProfile.data()?.alarms?.lunch?.toDate(),
                        dinner: userProfile.data()?.alarms?.dinner?.toDate(),
                    },
                });
                setRecentlyViewed([...userProfile.data().recentlyViewed]);
            } else setUserProfile(undefined);

            return userProfile;
        } catch (error) {
            console.log(error);
        }
    };

    const getDESQuestionsAsync = async () => {
        try {
            const snapshot = await firestore().collection("DES").get();
            const DESQuestions = [];
            snapshot.forEach((doc) => {
                DESQuestions.push({id: doc.id, ...doc.data()});
            });
            setDESQuestions(DESQuestions);
        } catch (error) {
            console.log(error);
        }
    };

    const getGDMKQQuestionsAsync = async () => {
        try {
            const snapshot = await firestore().collection("GDMKQ").get();
            const GDMKQQuestions = [];
            snapshot.forEach((doc) => {
                GDMKQQuestions.push({
                    id: doc.id,
                    statement: doc.data().question,
                    options: [
                        {label: doc.data().option1, value: doc.data().option1},
                        {label: doc.data().option2, value: doc.data().option2},
                        {label: doc.data().option3, value: doc.data().option3},
                        {label: doc.data().option4, value: doc.data().option4},
                    ],
                });
            });
            setGDMKQQuestions(GDMKQQuestions);
        } catch (error) {
            console.log(error);
        }
    };

    const _setDESAnswers = (answers) => {
        setDESAnswers(answers);
    };

    const _setGDMKQAnswers = (answers) => {
        setGDMKQAnswers(answers);
    };

    const createUserProfile = () => {
        const userProfile = {
            ...demographic,
            DESAnswers,
            GDMKQAnswers,
        };
        firestore()
            .collection("users")
            .doc(user?.uid)
            .set({
                createdAt: firestore.FieldValue.serverTimestamp(),
                ...userProfile,
            })
            .then(() => {
                setUserProfile(userProfile);
            });
    };

    const getQuickTipsAsync = async (userProfile) => {
        try {
            const snapshot = await firestore().collection("tips").get();
            const tips = [];
            snapshot.forEach((doc) => {
                tips.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setQuickTips([
                ...tips.filter((tip) => !userProfile?.viewedTips?.includes(tip.id)),
            ]);
        } catch (error) {
            console.log(error);
        }
    };

    const showQuickTip = (screen) => {
        // console.log(quickTips.includes((tip) => tip.screen === screen));
        if (quickTips?.find((tip) => tip.screen === screen)) {
            const currentTip = quickTips?.find((tip) => tip.screen === screen);
            console.log("includes");
            showMessage({
                message: "Quick Tip",
                description: currentTip?.tip,
                autoHide: false,
                titleProps: currentTip?.type,
            });
            setQuickTips([...quickTips.filter((tip) => tip.id !== currentTip.id)]);
            addToViewedTips(currentTip);
        }
    };

    const addToViewedTips = (tip) => {
        firestore()
            .collection("users")
            .doc(user?.uid)
            .update({viewedTips: firestore.FieldValue.arrayUnion(tip.id)});
    };

    const recordTipResponse = (tip) => {
        firestore()
            .collection("users")
            .doc(user?.uid)
            .update({responses: firestore.FieldValue.arrayUnion(tip)});
    };

    useEffect(() => {
        if (
            DESQuestions !== undefined &&
            GDMKQQuestions !== undefined &&
            quickTips !== undefined &&
            !userProfile
        )
            setInitialized(true);
    }, [DESQuestions, GDMKQQuestions, quickTips]);

    return (
        <InitDataContext.Provider
            value={{
                userProfile,
                getUserProfileAsync,
                GDMKQQuestions,
                getGDMKQQuestionsAsync,
                DESQuestions,
                getDESQuestionsAsync,
                initialized,
                DESAnswers,
                _setDESAnswers,
                GDMKQAnswers,
                _setGDMKQAnswers,
                createUserProfile,
                demographic,
                _setValue,
                recentlyViewed,
                addToRecentlyViewed,
                updateProfile,
                goals,
                getUserGoals,
                addGoalToProfile,
                completeGoal,
                quickTips,
                getQuickTipsAsync,
                showQuickTip,
                addToViewedTips,
                recordTipResponse,
                updateQuestionnaireResponse,
                consentLink,
                getConsentLink,
            }}
        >
            {props.children}
        </InitDataContext.Provider>
    );
}
