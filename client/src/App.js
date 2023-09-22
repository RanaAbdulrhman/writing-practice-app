import React from 'react'
import './App.css'
import Navbar from 'components/Navbar'
import WritePage from 'pages/Write'

function App() {
    // const [data, setData] = React.useState(null)

    // React.useEffect(() => {
    //     fetch('/api')
    //         .then((res) => res.json())
    //         .then((data) => setData(data.message))
    // }, [])

    return (
        <div className="App min-h-screen">
            <Navbar />
            <div>
                <WritePage />
            </div>
        </div>
    )
}

export default App
