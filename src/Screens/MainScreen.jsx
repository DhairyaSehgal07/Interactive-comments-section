import React from 'react'
import CommentScreenDesktop from '../components/Desktop/CommentScreenDesktop';
import CommentScreenMobile from '../components/Mobile/CommentScreenMobile';



const MainScreen = () => {

   const isSmallScreen = window.innerWidth <1000; 
  return (
      <>
          <div className='flex justify-center align-center'>
              <main className='flex flex-col text-center bg-Very_Light_Gray  w-[85%]  mt-10 lg:w-[58%] lg:p-4'>             
                  
                  {isSmallScreen ?
                      (<CommentScreenMobile/>): (<CommentScreenDesktop/>)
                    }
               
              </main>
          </div>
      </>
  )
}

export default MainScreen