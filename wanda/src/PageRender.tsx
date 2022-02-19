import React from 'react';
import { useParams } from 'react-router-dom';
import NotFound from './components/NotFound';

const generatePage = (pageName: string) =>{
    const component = () => require(`./pages/${pageName}`).default

    try {
        return React.createElement(component())  
    } catch (error: any) {
        return <NotFound />
    }
}

export default function PageRender() {
  const { page, slug } = useParams()
  let pageName

  slug ? pageName = `${page}/[slug]` : pageName = `${page}`

  return generatePage(pageName)
}
