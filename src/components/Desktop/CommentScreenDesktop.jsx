import React, { useState } from 'react';


const CommentScreenDesktop = () => {

const [newCommentText, setNewCommentText]= useState('')  
  const [replyToUser, setReplyToUser] = useState(null);
  const[commentReplyToUser,setCommentReplyToUser]= useState(null)
  const [newReplyText, setNewReplyText] = useState('');
  const [newId, setNewId] = useState(4);
  const [editingReplyIndex, setEditingReplyIndex] = useState(null);
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState('');
  const [editedReplyText, setEditedReplyText] = useState('');
  
  const maxLength = 200;

  const handleCommentChange = (event) => {
    const inputComment = event.target.value;
    if (inputComment.length <= maxLength) {
      setNewCommentText(inputComment);
    }
  };

  const remainingChars = maxLength - newCommentText.length;

  const [data, setData] = useState({
  
    currentUser: {
      image: {
        png: 'image-juliusomo.png',
      },
      username: 'juliusomo',
    },
    comments: [
      {
        id: 1,
        content: "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        createdAt: '1 month ago',
        score: 12,
        liked: false,
        disliked: false,
        user: {
          image: {
            png: 'image-amyrobson.png',
          },
          username: 'amyrobson',
        },
        replies: [],
      },
      {
        id: 2,
        content: "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
        createdAt: '2 weeks ago',
        score: 5,
        liked: false,
        disliked: false,
        user: {
          image: {
            png: 'image-maxblagun.png',
          },
          username: 'maxblagun',
        },
        replies: [
          {
            id: 3,
            content: "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
            createdAt: '1 week ago',
            score: 4,
            liked: false,
            disliked: false,
            replyingTo: 'maxblagun',
            user: {
              image: {
                png: 'image-ramsesmiron.png',
              },
              username: 'ramsesmiron',
            },
          },
          {
            id: 4,
            content: "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
            createdAt: '2 days ago',
            score: 2,
            liked: false,
            disliked: false,
            replyingTo: 'ramsesmiron',
            user: {
              image: {
                png: 'image-juliusomo.png',
              },
              username: 'juliusomo',
            },
          },
        ],
      },
    ],
  });



{/*COMMENT FUNCTIONS BEGIN HERE */}
  const handleCommentSubmit = () => {
  if (newCommentText.trim() === '') {
    return; // Don't add empty replies
  }

  const newComment = {
    id: newId + 1,
    content: newCommentText,
    createdAt: 'just now',
    score: 0,
    liked: false,
    disliked: false,
    user: {
      image: {
        png: 'image-juliusomo.png',
      },
      username: 'juliusomo',
    },
    replies:[]
  };

  const updatedComments = [...data.comments];
 updatedComments.push(newComment);

  setData((prevData) => ({
    ...prevData,
    comments: updatedComments,
  }));

  // Reset the reply form
  
  setNewCommentText('');
  setNewId((prevId) => prevId + 1);
  };

  const handleCommentDeleteConfirmation = (commentIndex) => {
    
     // Darken the background
    const overlay = document.createElement('div');
    overlay.className = 'fixed top-0 left-0 w-full h-full bg-black bg-opacity-50';
    document.body.appendChild(overlay);

    // Create the confirmation div
    const confirmationDiv = document.createElement('div');
    confirmationDiv.className = 'w-[23rem] rounded-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4';

    const deleteCommentHeading = document.createElement('p');
    deleteCommentHeading.className = 'text-xl text-Dark_Blue font-semibold p-3 px-2 ';
    deleteCommentHeading.textContent = 'Delete Comment';

    confirmationDiv.appendChild(deleteCommentHeading);
    // Add the confirmation message
    const confirmationMessage = document.createElement('p');
    confirmationMessage.className = 'text-Grayish_Blue px-2';
    confirmationMessage.textContent = "Are you sure you want to delete this comment? This will remove the comment and can't be undone.";
    confirmationDiv.appendChild(confirmationMessage);

    const BooleanButtonContainer = document.createElement('div');
    BooleanButtonContainer.className = 'flex ml-2 mt-4';
    // Add the yes and no buttons
    const yesButton = document.createElement('button');
    yesButton.className = 'bg-Soft_Red p-2 px-8 rounded-lg text-White ml-4 ';
    yesButton.textContent = 'Yes, Delete';
    yesButton.addEventListener('click', () => {
      // Handle the delete action here
      // ...
       const updatedComments = [...data.comments];
      updatedComments.splice(commentIndex, 1);
  
  setData((prevData) => ({
    ...prevData,
    comments: updatedComments,
  }));
        

      // Remove the overlay and confirmation div
      document.body.removeChild(overlay);
      document.body.removeChild(confirmationDiv);

      
    });

    const noButton = document.createElement('button');
    noButton.className = 'bg-Grayish_Blue p-2 px-8 rounded-lg text-White';
    noButton.textContent = 'No, Cancel';
    noButton.addEventListener('click', () => {
      // Remove the overlay and confirmation div
      document.body.removeChild(overlay);
      document.body.removeChild(confirmationDiv);
    });
    BooleanButtonContainer.appendChild(noButton);
    BooleanButtonContainer.appendChild(yesButton);
    confirmationDiv.appendChild(BooleanButtonContainer);

    // Add the confirmation div to the document
    document.body.appendChild(confirmationDiv);




};

  const handleCommentEdit = (commentIndex) => {
    setEditingCommentIndex(commentIndex);
    setEditedCommentText(data.comments[commentIndex].content);
  };

    const handleCommentSave = (commentIndex) => {
    const updatedComments = [...data.comments];
      updatedComments[commentIndex].content = editedCommentText;
      
      updatedComments[commentIndex].createdAt=`${updatedComments[commentIndex].createdAt} (Edited)`

    setData((prevData) => ({
      ...prevData,
      comments: updatedComments,
    }));

    setEditingCommentIndex(null);
  };

    const handleCommentReplySubmit = (commentIndex) => {
  if (newReplyText.trim() === '') {
    return; // Don't add empty replies
  }

  const newReply = {
    id: newId + 1,
    content: newReplyText,
    createdAt: 'just now',
    score: 0,
    liked: false,
    disliked: false,
    replyingTo: data.comments[commentIndex].user.username,
    user: {
      image: {
        png: 'image-juliusomo.png',
      },
      username: 'juliusomo',
    },
  };

  const updatedComments = [...data.comments];
  updatedComments[commentReplyToUser].replies.push(newReply);

  setData((prevData) => ({
    ...prevData,
    comments: updatedComments,
  }));

  // Reset the reply form
  setCommentReplyToUser(null);
  setNewReplyText('');
  setNewId((prevId) => prevId + 1);
};



  
  {/*COMMENT FUNCTIONS END HERE */ }

{/*REPLY*/}

  
  const TriggerCommentReply = (index) => {
    setCommentReplyToUser(index)
  }
  
  const TriggerReply = (index) => {
    setReplyToUser(index);
   
  };



  const handleReplySubmit = (commentIndex, replyIndex) => {
  if (newReplyText.trim() === '') {
    return; // Don't add empty replies
  }

  const newReply = {
    id: newId + 1,
    content: newReplyText,
    createdAt: 'just now',
    score: 0,
    liked: false,
    disliked: false,
    replyingTo: data.comments[commentIndex].replies[replyIndex].user.username,
    user: {
      image: {
        png: 'image-juliusomo.png',
      },
      username: 'juliusomo',
    },
  };

  const updatedComments = [...data.comments];
  updatedComments[replyToUser].replies.push(newReply);

  setData((prevData) => ({
    ...prevData,
    comments: updatedComments,
  }));

  // Reset the reply form
  setReplyToUser(null);
  setNewReplyText('');
  setNewId((prevId) => prevId + 1);
};
  
   const handleIncrementScore = (commentIndex) => {
    const updatedComments = [...data.comments];
    const comment = updatedComments[commentIndex];

     if (!comment.liked && !comment.disliked) {
       comment.score += 1; 
       comment.liked = true;
     } else if (comment.liked) { 
       comment.score -= 1; 
       comment.liked = false;
   }

    setData((prevData) => ({
      ...prevData,
      comments: updatedComments,
    }));
  };


   const handleIncrementReplyScore = (commentIndex,replyIndex) => {
    const updatedComments = [...data.comments];
    const comment = updatedComments[commentIndex].replies[replyIndex];

     if (!comment.liked && !comment.disliked) {
       comment.score += 1; 
       comment.liked = true;
     } else if (comment.liked) { 
       comment.score -= 1; 
       comment.liked = false;
   }

    setData((prevData) => ({
      ...prevData,
      comments: updatedComments,
    }));
  };


  const handleDecrementScore = (commentIndex) => {
    const updatedComments = [...data.comments];
    const comment = updatedComments[commentIndex];

    if (!comment.disliked && !comment.liked) {
      comment.score -= 1;
      comment.disliked = true;
    } else if (comment.disliked) {
      comment.score += 1; 
      comment.disliked = false;
    }

    setData((prevData) => ({
      ...prevData,
      comments: updatedComments,
    }));
  };

   const handleDecrementReplyScore = (commentIndex,replyIndex) => {
    const updatedComments = [...data.comments];
    const comment = updatedComments[commentIndex].replies[replyIndex];

    if (!comment.disliked && !comment.liked) {
      comment.score -= 1;
      comment.disliked = true;
    } else if (comment.disliked) {
      comment.score += 1; 
      comment.disliked = false;
    }

    setData((prevData) => ({
      ...prevData,
      comments: updatedComments,
    }));
  };

   const handleReplyDeleteConfirmation = (commentIndex,replyIndex) => {
    // Darken the background
    const overlay = document.createElement('div');
    overlay.className = 'fixed top-0 left-0 w-full h-full bg-black bg-opacity-50';
    document.body.appendChild(overlay);

    // Create the confirmation div
    const confirmationDiv = document.createElement('div');
    confirmationDiv.className = 'w-[23rem] rounded-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4';

    const deleteCommentHeading = document.createElement('p');
    deleteCommentHeading.className = 'text-xl text-Dark_Blue font-semibold p-3 px-2 ';
    deleteCommentHeading.textContent = 'Delete Comment';

    confirmationDiv.appendChild(deleteCommentHeading);
    // Add the confirmation message
    const confirmationMessage = document.createElement('p');
    confirmationMessage.className = 'text-Grayish_Blue px-2';
    confirmationMessage.textContent = "Are you sure you want to delete this comment? This will remove the comment and can't be undone.";
    confirmationDiv.appendChild(confirmationMessage);

    const BooleanButtonContainer = document.createElement('div');
    BooleanButtonContainer.className = 'flex ml-2 mt-4';
    // Add the yes and no buttons
    const yesButton = document.createElement('button');
    yesButton.className = 'bg-Soft_Red p-2 px-8 rounded-lg text-White ml-4 ';
    yesButton.textContent = 'Yes, Delete';
    yesButton.addEventListener('click', () => {
      // Handle the delete action here
      // ...
      const updatedComments = [...data.comments];
  const comment = updatedComments[commentIndex];
  comment.replies.splice(replyIndex, 1); // Remove the selected reply

  setData((prevData) => ({
    ...prevData,
    comments: updatedComments,
  }));
        

      // Remove the overlay and confirmation div
      document.body.removeChild(overlay);
      document.body.removeChild(confirmationDiv);

      
    });

    const noButton = document.createElement('button');
    noButton.className = 'bg-Grayish_Blue p-2 px-8 rounded-lg text-White';
    noButton.textContent = 'No, Cancel';
    noButton.addEventListener('click', () => {
      // Remove the overlay and confirmation div
      document.body.removeChild(overlay);
      document.body.removeChild(confirmationDiv);
    });
    BooleanButtonContainer.appendChild(noButton);
    BooleanButtonContainer.appendChild(yesButton);
    confirmationDiv.appendChild(BooleanButtonContainer);

    // Add the confirmation div to the document
    document.body.appendChild(confirmationDiv);
  };

  

  const handleReplyEdit = (replyIndex,commentIndex) => {
    setEditingReplyIndex(replyIndex);
    setEditedReplyText(data.comments[commentIndex].replies[replyIndex].content);
  };

  const handleReplySave = (commentIndex, replyIndex) => {
    const updatedComments = [...data.comments];
    updatedComments[commentIndex].replies[replyIndex].content = editedReplyText;

    const reply = updatedComments[commentIndex].replies[replyIndex];
  reply.content = editedReplyText;
  reply.createdAt = ` ${reply.createdAt} (Edited)`;

    setData((prevData) => ({
      ...prevData,
      comments: updatedComments,
    }));

    setEditingReplyIndex(null);
  };



  return (
    <div>
      {data.comments.map((comment, commentIndex) => (
        <div key={comment.id}>
          {comment.user.username === data.currentUser.username ? (
            <>
              {commentIndex === editingCommentIndex ? (<>
                <div className='flex justify-center align-center mt-6 ml-8'>
                  <div className='flex bg-[White] w-full rounded-lg'>
                    <div className='flex-grow-4'>
                  <div className="flex flex-col items-center justify-between w-[2.5rem] h-[5.983rem] bg-Very_Light_Gray hover:bg-gray-100 text-gray-800 font-semibold px-2 rounded-lg shadow m-6 mr-3">
                        <button
                          className="focus:outline-none text-[1.25rem] font-thick block text-Light_Grayish_Blue"
                          onClick={() => handleIncrementScore(commentIndex,replyIndex)}
                        >
                          {comment.liked ? (<><span className='text-Moderate_Blue ]'>+</span></>) : (<><span>+</span></>)}
                        </button>
                        <span className="text-[1remx] relative top-[0.25rem] text-Moderate_Blue">
                          {comment.score}
                        </span>
                        <button
                          className="focus:outline-none text-[1.75rem] font-thick block text-Light_Grayish_Blue"
                          onClick={()=> handleDecrementScore(commentIndex,replyIndex)}
                        >
                          {comment.disliked ? (<><span className='text-Moderate_Blue'>-</span></>) : (<><span>-</span></>)}
                        </button>
                       </div>
                    </div>
                    <div className='flex-1'>
                          <nav className='flex justify-between p-2 mt-4'>
                                <div className='flex'>
                                  <div className='ml-2 flex-2 h-[2.188rem] w-[2.188rem]'>     
                            <img
                              src={comment.user.image.png}
                              className="w-full h-full object-cover"
                              alt="User Avatar"
                            />
                                  </div>
                          <div className="ml-3 text-Dark_Blue font-semibold">
                            {comment.user.username}
                          </div>
                       
                          </div>
                      </nav>
                                <div>
                                <textarea
                                  className='w-[80%] h-[6rem] border-2 border-black'
                                  value={editedCommentText}
                                  onChange={(e) => setEditedCommentText(e.target.value)}
                                />
                                <button
                                  className=' relative left-[0.5rem] px-4 h-[2rem] text-white bg-Moderate_Blue rounded-md'
                                  onClick={() => handleCommentSave(commentIndex)}>Save</button>
                      </div>
                      </div>
                  </div>
            </div>
              </>) : (
                  <>
                  <div className="flex justify-center align-center mt-6">
            <div className="flex bg-[White] w-full rounded-lg">
              <div className="flex-grow-4">
                {/* Code for button */}
                <div className="flex flex-col items-center justify-between w-[2.5rem] h-[5.983rem] bg-Very_Light_Gray hover:bg-gray-100 text-gray-800 font-semibold px-2 rounded-lg shadow m-6 mr-3">
                  <button
                    
                    className="focus:outline-none text-[1.25rem] font-thick block text-Light_Grayish_Blue"
                  >
                    +
                  </button>
                  <span className="text-[1remx] relative top-[0.25rem] text-Moderate_Blue">
                    {comment.score}
                  </span>
                  <button
                    className="focus:outline-none text-[1.75rem] font-thick block text-Light_Grayish_Blue"
                   
                  >
                   -
                  </button>
                </div>
                {/* Code for button */}
              </div>
              <div className="flex-1">
                <nav className="flex justify-between p-2 mt-4">
                  <div className="flex">
                    <div className="ml-2 flex-2 h-[2.188rem] w-[2.188rem]">
                      <img
                        src={comment.user.image.png}
                        className="w-full h-full object-cover"
                        alt="User Avatar"
                      />
                    </div>
                    <div className="ml-3 text-Dark_Blue font-semibold">
                      {comment.user.username}
                              </div>
{/*//////////////////////////////////////////////////////////////////////////*/}    <div className='ml-2 mt-[0.125rem] h-[1.3rem] rounded px-2 bg-Moderate_Blue text-[White] text-[0.75rem] font-semibold'>you</div>
                    <div className="ml-4 text-Grayish_Blue">
                      {comment.createdAt} 
                    </div>
                  </div>
     <div className='flex relative top-[5px]  mr-3'>
          <span onClick={()=>handleCommentDeleteConfirmation(commentIndex)} className='flex items-center justify-between h-[1.875rem]   border-White  font-semibold px-2  rounded-lg relative top-[-9px] cursor-pointer  '>
              <svg className='relative top-[-0.063rem] left-[-0.375rem]' width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/></svg>
             <p className=' text-Soft_Red'>Delete</p>
              </span>
                <span onClick={() => handleCommentEdit(commentIndex)} className='flex items-center justify-between h-[1.875rem]   border-White  font-semibold px-2  rounded-lg   relative  top-[-0.563rem] cursor-pointer '>
             <svg className='relative left-[-0.3rem]' width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/></svg>
             <p className='  text-Moderate_Blue'> Edit</p>
                  </span>
                       </div>
                </nav>
                 <p className="text-left text-[1rem] px-4 text-Grayish_Blue pb-7">
                  {comment.content}
                </p>
          
           {/* Show reply div */}
        
              </div>
            </div>
          </div>  
                </>)}
            </>) : (
            <>
              <div className="flex justify-center align-center mt-6">
            <div className="flex bg-[White] w-full rounded-lg">
              <div className="flex-grow-4">
                {/* Code for button */}
                <div className="flex flex-col items-center justify-between w-[2.5rem] h-[5.983rem] bg-Very_Light_Gray hover:bg-gray-100 text-gray-800 font-semibold px-2 rounded-lg shadow m-6 mr-3">
                  <button
                    onClick={() => handleIncrementScore(commentIndex)}
                    className="focus:outline-none text-[1.25rem] font-thick block text-Light_Grayish_Blue"
                  >
                    {comment.liked ? (<><span className='text-Moderate_Blue ]'>+</span></>) : (<><span>+</span></>)}
                  </button>
                  <span className="text-[1remx] relative top-[0.25rem] text-Moderate_Blue">
                    {comment.score}
                  </span>
                  <button
                    className="focus:outline-none text-[1.75rem] font-thick block text-Light_Grayish_Blue"
                    onClick={() => handleDecrementScore(commentIndex)}
                  >
                    {comment.disliked ? (<><span className='text-Moderate_Blue'>-</span></>) : (<><span>-</span></>)}
                  </button>
                </div>
                {/* Code for button */}
              </div>
              <div className="flex-1">
                <nav className="flex justify-between p-2 mt-4">
                  <div className="flex">
                    <div className="ml-2 flex-2 h-[2.188rem] w-[2.188rem]">
                      <img
                        src={comment.user.image.png}
                        className="w-full h-full object-cover"
                        alt="User Avatar"
                      />
                    </div>
                    <div className="ml-3 text-Dark_Blue font-semibold">
                      {comment.user.username}
                    </div>
                    <div className="ml-4 text-Grayish_Blue">
                      {comment.createdAt}
                    </div>
                  </div>
                        <span
                           onClick={() => TriggerCommentReply(commentIndex)}
                    className="flex items-center justify-between h-[1.875rem] border-White font-semibold px-2 rounded-lg mr-3 mt-2 relative top-[-0.6rem] cursor-pointer">
                    <svg
                      className="relative top-[0.063rem] left-[-0.375rem]"
                      width="14"
                      height="13"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                        fill="#5357B6"
                      />
                    </svg>
                    <p className="text-Moderate_Blue" >Reply</p>
                  </span>

                </nav>
                 <p className="text-left text-[1rem] px-4 text-Grayish_Blue pb-7">
                  {comment.content}
                </p>
          
           {/* Show reply div */}
        
              </div>
            </div>
          </div>  
            </>)}

          {commentReplyToUser !== null && commentReplyToUser === commentIndex ? (
              <div>
           <div className='flex justify-center align-center mt-6 '>
            <div className='flex bg-[White] w-full rounded-lg'>
                <div className='flex-grow-4 ml-16'>

                   </div>  
                            <div className='flex-1'>
                              <nav className='flex justify-between p-2 m-4'>
                                <div className='flex'>
                                  <div className='ml-2 flex-2 h-[2.188rem] w-[2.188rem]'>
                                    <img
                              src={data.currentUser.image.png}
                              className="w-full h-full object-cover"
                              alt="User Avatar"
                            />
                                  </div>
                            <div className="ml-3 text-Dark_Blue font-semibold">
                            {data.currentUser.username}
                          </div>
                                </div>
                              </nav>
                              <div className='flex relative mb-4 top-[-1rem]'>
               <p className='font-semibold text-Moderate_Blue'>@{comment.user.username}</p>
                  <textarea
                    className='ml-2 w-[60%] h-[6rem] border-2 border-black'
                    placeholder='Enter reply here...'
                    value={newReplyText}
                    onChange={(e) => setNewReplyText(e.target.value)}
                  ></textarea>
                                <button
                                  className='relative left-[0.5rem] px-4 h-[2rem] text-white bg-Moderate_Blue rounded-md'
                                  onClick={() => { handleCommentReplySubmit(commentIndex) }}>Reply</button>
                            </div>
                            </div>     
             </div>         
            </div>

                </div>
              
            ) : (<></>)}
  
          {/*PASTE HERE */}
<div className="ml-10 border-l-2 border-Light_Gray">
            {comment.replies.map((reply, replyIndex) => (
              <div key={reply.id}>
                {reply.user.username === data.currentUser.username ? (<>
                  {replyIndex === editingReplyIndex ? (
                    <>
                      <div>
                        <div className='flex justify-center align-center mt-6 ml-8'>
                          <div className='flex bg-[White] w-full rounded-lg'>
                            <div className='flex-grow-4'>
                               <div className="flex flex-col items-center justify-between w-[2.5rem] h-[5.983rem] bg-Very_Light_Gray hover:bg-gray-100 text-gray-800 font-semibold px-2 rounded-lg shadow m-6 mr-3">
                        <button
                          className="focus:outline-none text-[1.25rem] font-thick block text-Light_Grayish_Blue"
                          onClick={() => handleIncrementReplyScore(commentIndex,replyIndex)}
                        >
                          {reply.liked ? (<><span className='text-Moderate_Blue ]'>+</span></>) : (<><span>+</span></>)}
                        </button>
                        <span className="text-[1remx] relative top-[0.25rem] text-Moderate_Blue">
                          {reply.score}
                        </span>
                        <button
                          className="focus:outline-none text-[1.75rem] font-thick block text-Light_Grayish_Blue"
                          onClick={()=> handleDecrementReplyScore(commentIndex,replyIndex)}
                        >
                          {reply.disliked ? (<><span className='text-Moderate_Blue'>-</span></>) : (<><span>-</span></>)}
                        </button>
                       </div>
                      </div>
                            <div className='flex-1'>
                              <nav className='flex justify-between p-2 mt-4'>
                                <div className='flex'>
                                  <div className='ml-2 flex-2 h-[2.188rem] w-[2.188rem]'>     
                            <img
                              src={reply.user.image.png}
                              className="w-full h-full object-cover"
                              alt="User Avatar"
                            />
                                  </div>
                          <div className="ml-3 text-Dark_Blue font-semibold">
                            {reply.user.username}
                          </div>
                       
                                </div>
                              </nav>
                               <div>
                                <textarea
                                  className='w-[80%] h-[6rem] border-2 border-black'
                                  value={editedReplyText}
                                  onChange={(e) => setEditedReplyText(e.target.value)}
                                />
                                <button
                                  className=' relative left-[0.5rem] px-4 h-[2rem] text-white bg-Moderate_Blue rounded-md'
                                  onClick={() => handleReplySave(commentIndex, replyIndex)}>Save</button>
                      </div>
                            </div>      
                          </div>
                       </div>
                      </div>
                    </>) : (<>
                      <div className="flex justify-center align-center mt-6 ml-8">
                  <div className="flex bg-[White] w-full rounded-lg">
                    <div className="flex-grow-4">
                      {/* Code for button */}
                      <div className="flex flex-col items-center justify-between w-[2.5rem] h-[5.983rem] bg-Very_Light_Gray hover:bg-gray-100 text-gray-800 font-semibold px-2 rounded-lg shadow m-6 mr-3">
                        <button
                          className="focus:outline-none text-[1.25rem] font-thick block text-Light_Grayish_Blue"
                        >
                          +
                        </button>
                        <span className="text-[1remx] relative top-[0.25rem] text-Moderate_Blue">
                          {reply.score}
                        </span>
                        <button
                          className="focus:outline-none text-[1.75rem] font-thick block text-Light_Grayish_Blue"
                         
                        >
                          -
                        </button>
                       </div>
                      {/* Code for button */}
                    </div>
                    <div className="flex-1">
                      <nav className="flex justify-between p-2 mt-4">
                        <div className="flex">
                          <div className="ml-2 flex-2 h-[2.188rem] w-[2.188rem]">
                            <img
                              src={reply.user.image.png}
                              className="w-full h-full object-cover"
                              alt="User Avatar"
                            />
                          </div>
                          <div className="ml-3 text-Dark_Blue font-semibold">
                            {reply.user.username}
                          </div>
                          <div className="ml-4 text-Grayish_Blue">
                            {reply.createdAt}
                          </div>
                        </div>
                        
                        
                      <div className='flex relative top-[5px]  mr-3'>
                              <span onClick={()=>handleReplyDeleteConfirmation(commentIndex,replyIndex)} className='flex items-center justify-between h-[1.875rem]   border-White  font-semibold px-2  rounded-lg relative top-[-9px] cursor-pointer  '>
              <svg className='relative top-[-0.063rem] left-[-0.375rem]' width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/></svg>
             <p className=' text-Soft_Red'>Delete</p>
              </span>
                <span onClick={() => handleReplyEdit(replyIndex,commentIndex)} className='flex items-center justify-between h-[1.875rem]   border-White  font-semibold px-2  rounded-lg   relative  top-[-0.563rem] cursor-pointer '>
             <svg className='relative left-[-0.3rem]' width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/></svg>
             <p className='  text-Moderate_Blue'> Edit</p>
                  </span>
                       </div>
                      </nav>
                      <p className="text-left text-[1rem] px-4 text-Grayish_Blue pb-7">
                             <span className='font-semibold text-Moderate_Blue'>@{reply.replyingTo}</span>  {reply.content}
                      </p>
                    </div>
                  </div>
                </div> 
                    </>)}
                </>) :
                  (<>
                    <div className='flex justify-center align-center mt-6 ml-8'>
                      <div className='flex bg-[White] w-full rounded-lg'>
                        <div className='flex-grow-4'>
                          <div className='flex flex-col items-center justify-between  w-[2.5rem] h-[5.983rem] bg-Very_Light_Gray hover:bg-gray-100 text-gray-800 font-semibold px-2 rounded-lg shadow m-6 mr-3'>
                               <button
                          className="focus:outline-none text-[1.25rem] font-thick block text-Light_Grayish_Blue"
                          onClick={() => handleIncrementReplyScore(commentIndex,replyIndex)}
                        >
                          {reply.liked ? (<><span className='text-Moderate_Blue ]'>+</span></>) : (<><span>+</span></>)}
                        </button>
                        <span className="text-[1rem] relative top-[0.25rem] text-Moderate_Blue">
                          {reply.score}
                        </span>
                        <button
                          className="focus:outline-none text-[1.75rem] font-thick block text-Light_Grayish_Blue"
                          onClick={()=> handleDecrementReplyScore(commentIndex,replyIndex)}
                        >
                          {reply.disliked ? (<><span className='text-Moderate_Blue'>-</span></>) : (<><span>-</span></>)}
                        </button>
                          </div>
                        </div>
                        <div className='flex-1'>
                          <nav className='flex justify-between p-2 mt-4'>
                            <div className='flex'>
                              <div className='ml-2 flex-2 h-[2.188rem] w-[2.188rem]'>
                                <img
                                  src={reply.user.image.png}
                                  className='w-full h-full object-cover'
                                  alt='User Avatar'
                                />
                              </div>
                              <div className='ml-3 text-Dark_Blue font-semibold'>
                                {reply.user.username} 
                              </div>
                              <div className='ml-4 text-Grayish_Blue'>
                                {reply.createdAt}
                              </div>
                            </div>
                            <span
                                onClick={() => TriggerReply(commentIndex,replyIndex)}
                              className="flex items-center justify-between h-[1.875rem] border-White font-semibold px-2 rounded-lg mr-3 mt-2 relative top-[-0.6rem] cursor-pointer">
                              <svg
                            className="relative top-[0.063rem] left-[-0.375rem]"
                            width="14"
                            height="13"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                              fill="#5357B6"
                            />
                          </svg>
                          <p className="text-Moderate_Blue">Reply</p>
                        </span>
                          </nav>
                           <p className="text-left text-[1rem] px-4 text-Grayish_Blue pb-7">
                        <span className='font-semibold text-Moderate_Blue'>@{reply.replyingTo}</span>  {reply.content}
                      </p>
                        </div>
                      </div>
                    </div>
              {replyToUser !== null && replyToUser === commentIndex ? (
              <div>
           <div className='flex justify-center align-center mt-6 ml-8'>
            <div className='flex bg-[White] w-full rounded-lg'>
                <div className='flex-grow-4 ml-10'>
             
                   </div>  
                            <div className='flex-1'>
                              <nav className='flex justify-between p-2 m-4'>
                                <div className='flex'>
                                  <div className='ml-2 flex-2 h-[2.188rem] w-[2.188rem]'>
                                    <img
                              src={data.currentUser.image.png}
                              className="w-full h-full object-cover"
                              alt="User Avatar"
                            />
                                  </div>
                            <div className="ml-3 text-Dark_Blue font-semibold">
                            {data.currentUser.username}
                          </div>
                                </div>
                              </nav>
                              <div className='flex relative mb-4 top-[-1rem]'>
               <p className='font-semibold text-Moderate_Blue'>@{comment.replies[replyIndex].user.username}</p>
                  <textarea
                    className='ml-2 w-[60%] h-[6rem] border-2 border-black'
                    placeholder='Enter reply here...'
                    value={newReplyText}
                    onChange={(e) => setNewReplyText(e.target.value)}
                  ></textarea>
                                <button
                                  className='relative left-[0.5rem] px-4 h-[2rem] text-white bg-Moderate_Blue rounded-md'
                                  onClick={() => { handleReplySubmit(commentIndex, replyIndex) }}>Reply</button>
                            </div>
                            </div>     
             </div>         
            </div>

                </div>
              
            ) : (<></>)}
                  </>)}
              </div>
              
            ))}
          </div>
             {/*PASTE HERE */}
        </div>
      ))}
       <div className="flex flex-col space-y-4 mt-6">
        <div className="p-4 bg-White rounded-lg">
          <div className="flex space-x-2 relative">
            <img
              className="h-[2.188rem] w-[2.188rem] mr-2 mt-1"
              src={data.currentUser.image.png}
              alt="User Avatar"
            />
            <textarea
              value={newCommentText}
              onChange={handleCommentChange}
              className="w-full h-28 p-2 border border-gray-300 rounded-lg resize-none"
              placeholder="Add a comment..."
              maxLength={200}
            ></textarea>
            <p className="absolute bottom-0 right-[7.5rem]">{remainingChars} characters remaining</p>
            <button
              onClick={handleCommentSubmit}
              type="submit"
              className="py-2 relative left-[0.5rem] px-8 h-[3.125rem] text-white bg-Moderate_Blue rounded-md"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentScreenDesktop;
