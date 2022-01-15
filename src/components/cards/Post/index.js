import PostBody from './partials/PostBody'
import PostFooter from './partials/PostFooter.js'
import PostHead from './partials/PostHead.js'
import './postcard.css'

function Index({ post }){
  return(
    <>
      <div className="post-card shadow radius" > 
         <PostHead post={post} />
         <PostBody post={post} />
         <PostFooter post={post} />
      </div>
    </>  
  )  
}

export default Index