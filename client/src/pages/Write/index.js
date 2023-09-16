import React from 'react'
import TopicBar from 'components/TopicBar'
import WritingSpace from 'components/WritingSpace'
import Sidebar from 'components/Sidebar'

export default function index() {
    return (
        <div className="flex flex-col items-center justify-center w-full flex-grow-1">
            <div className="flex justify-between gap-12 w-full xl:flex-nowrap sm:flex-wrap">
                <div className="flex flex-col items-center justify-center gap-12 mt-20 px-8 xl:w-3/4 sm:w-full ">
                    <TopicBar />
                    <WritingSpace />
                </div>
                <div className="xl:w-1/4 sm:w-full">
                    <Sidebar />
                </div>
            </div>
        </div>
    )
}
