import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import { ReactComponent as Logo } from "assets/logos/AppLogo.svg";
import { ReactComponent as RightArrow } from "assets/icons/toRightArrow.svg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { ReactComponent as WritingPage } from "assets/landingPageAssets/writingPage.svg";
import { ReactComponent as LogicalFlowCard } from "assets/landingPageAssets/logicalFlow.svg";
import { ReactComponent as GrammerCard } from "assets/landingPageAssets/grammerCard.svg";
import { ReactComponent as SuggestionCard } from "assets/landingPageAssets/suggestionCard.svg";
import { ReactComponent as SpellingCard } from "assets/landingPageAssets/spellingCard.svg";
import { ReactComponent as ScorePredictionFeature } from "assets/landingPageAssets/ScorePredictionFeature.svg";
import { ReactComponent as SpellingGrammerFeature } from "assets/landingPageAssets/SpellingGrammerFeature.svg";
import { ReactComponent as ImprovementSuggestionsFeature } from "assets/landingPageAssets/ImprovementSuggestionsFeature.svg";
import { ReactComponent as WritingWorkplace } from "assets/landingPageAssets/writingWorkplace.svg";
import { ReactComponent as CTABackground } from "assets/landingPageAssets/CTASection.svg";
import { ReactComponent as MessageIcon } from "assets/landingPageAssets/Message_light.svg";
import { ChevronRight } from "lucide-react";

export default function MainPage() {
  const [width, setWindowWidth] = useState(0);
  const navigate = useNavigate();

  function startWriting() {
    navigate("/write");
  }
  useEffect(() => {
    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  const responsive = {
    showHeroCards: width >= 1280,
  };

  const basicVariants = {
    start: { opacity: 0, y: -25 },
    while: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const leftVariants = {
    start: { opacity: 0, x: -50 },
    while: { opacity: 1, x: 0, transition: { duration: 0.65 } },
  };

  const rightVariants = {
    start: { opacity: 0, x: 50 },
    while: { opacity: 1, x: 0, transition: { duration: 0.65 } },
  };

  const FooterSection = () => (
    <div className=" bg-black py-3 flex flex-col items-center text-white ">
      <div className="font-semibold flex gap-1 items-center">
        <div className="w-7">
          <MessageIcon />
        </div>
        <div>Contact the Developer</div>
      </div>
      <div className="font-thin">RanaAbdulrhmanD@gmail.com</div>
    </div>
  );

  const FourthSection = () => (
    <div className={`flex w-full justify-center ${style.fourthSection}`}>
      <div className={`relative max-w-[1000px] w-[1000px] mx-4`}>
        <div className="relative top-0 -z-10">
          <CTABackground />
        </div>
        <div
          className={`absolute flex flex-col items-center w-full ${style.centeredContent}`}
        >
          <motion.div
            variants={basicVariants}
            initial={"start"}
            whileInView={"while"}
            className={` ${style.heading}`}
          >
            Start Your IELTS Success Story Today!
          </motion.div>

          <motion.div
            variants={basicVariants}
            initial={"start"}
            whileInView={"while"}
            onClick={startWriting}
            className={`${style.cta} flex gap-1 mt-3 py-1 px-5 hover:shadow-xl shadow-blue-800`}
          >
            <div className={`${style.text}`}>Start Writing</div>
            <RightArrow />
          </motion.div>
        </div>
      </div>
    </div>
  );

  const ThirdSection = () => (
    <div className={`flex justify-center ${style.thirdSection}`}>
      <div className="flex flex-col justify-center items-center gap-16 ">
        <motion.div
          variants={basicVariants}
          initial={"start"}
          whileInView={"while"}
          className={`${style.heading}`}
        >
          IELTS Writing Workspace
        </motion.div>
        <div className="flex justify-center items-center flex-wrap-reverse">
          <div className="flex flex-col gap-8 max-w-[350px] mb-10">
            <motion.div
              variants={rightVariants}
              initial={"start"}
              whileInView={"while"}
              className="flex gap-3"
            >
              <div className={`${style.featureNumber}`}>01.</div>
              <div className="flex flex-col gap-1">
                <div className={`${style.featureHeading}`}>
                  Real Test Environment
                </div>
                <div className={`${style.featureDesc}`}>
                  No auto-correction, simulating exam conditions.
                </div>
              </div>
            </motion.div>
            <motion.div
              variants={rightVariants}
              initial={"start"}
              whileInView={"while"}
              className="flex gap-3"
            >
              <div className={`${style.featureNumber}`}>02.</div>
              <div className="flex flex-col gap-1">
                <div className={`${style.featureHeading}`}>
                  Word Count Tracker
                </div>
                <div className={`${style.featureDesc}`}>
                  Monitor your essay length effortlessly.
                </div>
              </div>
            </motion.div>
            <motion.div
              variants={rightVariants}
              initial={"start"}
              whileInView={"while"}
              className="flex gap-3"
            >
              <div className={`${style.featureNumber}`}>03.</div>
              <div className="flex flex-col gap-1">
                <div className={`${style.featureHeading}`}>
                  Integrated Timer
                </div>
                <div className={`${style.featureDesc}`}>
                  Practice with time constraints.
                </div>
              </div>
            </motion.div>
          </div>
          <motion.div
            variants={leftVariants}
            initial={"start"}
            whileInView={"while"}
            className="w-[300px]  max-w-[350px] mb-10 flex justify-center items-center"
          >
            <WritingWorkplace />
          </motion.div>
        </div>
      </div>
    </div>
  );

  const SecondSection = () => (
    <div className={`flex justify-center ${style.secondSection} px-8`}>
      <div className={`grid grid-cols-2 gap-8`}>
        <div className="flex flex-col">
          <div className="flex flex-col gap-8">
            <motion.div
              variants={leftVariants}
              initial={"start"}
              whileInView={"while"}
              className="flex flex-col gap-5"
            >
              <div className={` ${style.heading}`}>
                Get Instant Writing Evaluation
              </div>
              <motion.div
                variants={leftVariants}
                initial={"start"}
                whileInView={"while"}
                onClick={startWriting}
                className={`${style.cta2} py-2 px-5 flex gap-1 justify-center items-center`}
              >
                <div className={`${style.text}`}>Start Writing</div>
                <ChevronRight color="currentColor" size="18" />
              </motion.div>
            </motion.div>
            <motion.div
              variants={leftVariants}
              initial={"start"}
              whileInView={"while"}
              className="flex flex-col gap-2"
            >
              <ScorePredictionFeature />
              <div className="flex gap-1">
                <div className={`${style.featureNumber}`}>01.</div>
                <div className={`${style.featureDesc}`}>
                  Accurate IELTS Score Prediction
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <motion.div
            variants={rightVariants}
            initial={"start"}
            whileInView={"while"}
            className="flex flex-col gap-2"
          >
            <SpellingGrammerFeature />
            <div className="flex gap-1">
              <div className={`${style.featureNumber}`}>02.</div>
              <div className={`${style.featureDesc}`}>
                Spelling and Grammar Checks
              </div>
            </div>
          </motion.div>
          <motion.div
            variants={rightVariants}
            initial={"start"}
            whileInView={"while"}
            className="flex flex-col gap-2"
          >
            <ImprovementSuggestionsFeature />
            <div className="flex gap-1">
              <div className={`${style.featureNumber}`}>03.</div>
              <div className={`${style.featureDesc}`}>
                Improvement Suggestions
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );

  const FirstSection = () => (
    <div className={`${style.hero} flex flex-col gap-16`}>
      <div className="flex justify-center items-center gap-2 py-3">
        <Logo />
        <div>Immersive Writing</div>
      </div>

      <div className="flex flex-col gap-3 items-center">
        <motion.div
          variants={basicVariants}
          initial={"start"}
          whileInView={"while"}
          className={`${style.heading}`}
        >
          Focus, Write, and Progress.
        </motion.div>
        <motion.div
          variants={basicVariants}
          initial={"start"}
          whileInView={"while"}
          className={`${style.headingDesc}`}
        >
          Experience a distraction-free writing environment and receive
          actionable feedback on your writing.
        </motion.div>
        <motion.div
          variants={basicVariants}
          initial={"start"}
          whileInView={"while"}
          onClick={startWriting}
          className={`${style.cta} flex gap-1 mt-3 py-2 px-5 hover:shadow-xl shadow-blue-800`}
        >
          <div className={`${style.text}`}>Start Writing</div>
          <RightArrow />
        </motion.div>
      </div>

      <motion.div
        variants={basicVariants}
        initial={"start"}
        whileInView={"while"}
        transition={"duration"}
        className="flex justify-center -mb-20"
      >
        {responsive.showHeroCards && (
          <div className="flex flex-col w-[250px]">
            <motion.div
              variants={leftVariants}
              initial={"start"}
              whileInView={"while"}
              className={`relative -mr-24 top-14 z-10 w-72`}
            >
              <SuggestionCard />
            </motion.div>
            <motion.div
              variants={leftVariants}
              initial={"start"}
              whileInView={"while"}
              className="relative -mr-16 top-36 z-10"
            >
              <GrammerCard />
            </motion.div>
          </div>
        )}
        <div className="w-[751px] min-h-[50%] mx-5 h-auto relative top-0 shadow-lg rounded-3xl">
          <WritingPage />
        </div>
        {responsive.showHeroCards && (
          <div className="flex flex-col w-[250px]">
            <motion.div
              variants={rightVariants}
              initial={"start"}
              whileInView={"while"}
              className="relative -ml-20 top-14 z-10 w-[399px] min-w-[100px]"
            >
              <LogicalFlowCard />
            </motion.div>
            <motion.div
              variants={rightVariants}
              initial={"start"}
              whileInView={"while"}
              className="relative -ml-16 top-36 z-10 w-72"
            >
              <SpellingCard />
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );

  return (
    <motion.div className={`flex flex-col gap-32 ${style.root}`}>
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <FooterSection />
    </motion.div>
  );
}
