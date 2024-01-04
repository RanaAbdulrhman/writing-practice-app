import React, { useState, useEffect } from 'react'
import axios from 'axios'

import styles from './style.module.scss'
import { ReactComponent as TopicIcon } from 'assets/icons/topicIcon.svg'
import { ReactComponent as CloseSign } from 'assets/icons/closeSign.svg'
import { ReactComponent as CheckIcon } from 'assets/icons/check.svg'

import { ReactComponent as EducationIcon } from 'assets/icons/Education.svg'
import { ReactComponent as TechnologyIcon } from 'assets/icons/Technology.svg'
import { ReactComponent as HealthIcon } from 'assets/icons/Health.svg'
import { ReactComponent as EnvironmentIcon } from 'assets/icons/Environment.svg'
import { ReactComponent as SocietyIcon } from 'assets/icons/Society.svg'
import { ReactComponent as GovernmentIcon } from 'assets/icons/Government.svg'
import { ReactComponent as WorkIcon } from 'assets/icons/Work.svg'
import { ReactComponent as CrimeIcon } from 'assets/icons/Crime.svg'
import { ReactComponent as MediaIcon } from 'assets/icons/Media.svg'

const TopicModal = ({ setTopic }) => {
    const [open, setIsOpen] = useState(true)
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null)

    const categories = [
        { name: 'Education', icon: <EducationIcon /> },
        { name: 'Technology', icon: <TechnologyIcon /> },
        { name: 'Health', icon: <HealthIcon /> },
        { name: 'Environment', icon: <EnvironmentIcon /> },
        { name: 'Society and Culture', icon: <SocietyIcon /> },
        { name: 'Government and Politics', icon: <GovernmentIcon /> },
        { name: 'Work and Employment', icon: <WorkIcon /> },
        { name: 'Crime and Punishment', icon: <CrimeIcon /> },
        { name: 'Arts and Media', icon: <MediaIcon /> },
    ]

    function selectCategory(index) {
        setSelectedCategoryIndex(index)
    }

    async function generateTopic(topic) {
        try {
            const res = await axios.post(
                'http://localhost:3004/generate-topic',
                {
                    topic: topic,
                }
            )
            const data = await res.data

            setTopic(data)
            localStorage.setItem('topic', data)
            return data
        } catch (err) {
            console.log(err)
        }
    }

    const categoryComponents = categories.map((item, index) => {
        return (
            <div
                className={`${styles.categoryBox} ${
                    selectedCategoryIndex === index && styles.selected
                }`}
                onClick={() => selectCategory(index)}
                key={index}
            >
                <div className="flex gap-4">
                    <div className={styles.iconContainer}>{item.icon}</div>
                    <span className={styles.categoryName}>{item.name}</span>
                </div>
                <div
                    className={`${styles.checkRound} ${
                        selectedCategoryIndex === index && styles.selected
                    }`}
                >
                    <CheckIcon />
                </div>
            </div>
        )
    })

    return (
        open && (
            <>
                <div
                    className={styles.darkBG}
                    onClick={() => setIsOpen(false)}
                />
                <div className={styles.centered}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <div className={styles.modalIcon}>
                                <TopicIcon />
                            </div>

                            <button
                                className={styles.closeBtn}
                                onClick={() => setIsOpen(false)}
                            >
                                <CloseSign />
                            </button>
                        </div>
                        <div className={styles.modalContent}>
                            <h5 className={styles.heading}>
                                Choose a Topic Type
                            </h5>
                            <p className={styles.modalDesc}>
                                Select the topic type that interests you the
                                most, and we'll generate a relevant discussion
                                topic for you.
                            </p>
                        </div>
                        <div className={styles.categoriesSection}>
                            {categoryComponents}
                        </div>
                        <button
                            onClick={() =>
                                generateTopic(
                                    categories[selectedCategoryIndex].name
                                )
                            }
                            className={styles.actionButton}
                        >
                            Generate a Topic
                        </button>
                    </div>
                </div>
            </>
        )
    )
}

export default TopicModal
