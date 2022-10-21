import Logline from "./Logline"
import styles from '../styles/components/AppContainer.module.scss'
import { useContext, useEffect, useState } from "react";
import FadeContainer from "./FadeContainer";
import Title from "./Title";
import Main from "./Main";


enum AppStage {
    loading,
    logline,
    title,
    authenticate,
}

const AppContainer = () => {


    const [appStage, setAppStage] = useState<AppStage>(AppStage.loading);

    useEffect(() => {
        setTimeout(() => {
            setTimeout(() => {
                setAppStage(AppStage.logline);
            }, 500)
        })
    }, [setAppStage]);


    return <div className={styles.screen}>
        <FadeContainer visible={appStage == AppStage.logline}>
            <Logline handleNext={() => {
                setAppStage(AppStage.title);
                setTimeout(() => {
                    setAppStage(AppStage.authenticate);
                }, 5000);
            }} />
        </FadeContainer>

        <FadeContainer visible={appStage == AppStage.title}>
            <Title />
        </FadeContainer>
        <FadeContainer visible={appStage == AppStage.authenticate}>
            <Main />
        </FadeContainer>

    </div>


}


export default AppContainer;