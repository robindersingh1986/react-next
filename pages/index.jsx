import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Navigation } from '../components/Navigation'
import Loader from '../components/Loader'

const URL = 'https://api.github.com/users?per_page=5'
const initialState = {
  data: null,
  isLoading: true
}

const Home = () => {
  const [state, setState] = useState(initialState)
  useEffect(()=> fetch(URL).then(async (res)=>{
    try {
      const response = await res.json()
      setState({ isLoading: false, data: response })
    } catch(err){
      console.error(err)
    }
  })

  ,[])
 
  const {isLoading , data} = state
  return (
    <>
    { isLoading && <Loader /> }
    {!isLoading && data && (<div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <main>

        <div className="row">
          <div className="main">
          {
            data.map((item) =>(
              <div key={item.id} className="description"><figure><img src={item.avatar_url} /></figure>{item.login}</div>
            ))
          }
          </div>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className="logo" />
        </a>
      </footer>
    </div> )}
    </>
  )
}

export default Home