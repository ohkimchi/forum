import { Button, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { postsCollection } from '../utils/firebase'

const TopicListDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px auto auto auto;
  width: 90vw;
`

const TimeOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}

const Forum = () => {
  const [tList, setTList] = useState({})
  const [newTopic, setNewTopic] = useState('')
  const [posts, setPosts] = useState(tList as any)
  const [comment, setComment] = useState({})
  const { TextArea } = Input

  useEffect(() => {
    const temp = {} as any
    postsCollection.get().then(async (snapshot: any) => {
      await snapshot.forEach((doc: any) => {
        const data = doc.data()
        temp[doc.id] = {
          topic: data.topic,
          topicAuthor: data.topicAuthor,
          topicTime: data.topicTime,
          comments: data.comments
        }
        setTList(temp)
      })
    })
  }, [])

  useEffect(() => {
    setPosts(tList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tList])

  function createNewTopic() {
    postsCollection.add({
      topic: newTopic,
      topicAuthor: 'username1',
      topicTime: Date.now(),
      comments: []
    })
  }

  function submitComment(topicId: string) {
    const commentContent = (comment as any)[topicId]
    const updatedPosts = {
      ...posts[topicId],
      comments: [
        ...(posts[topicId] as any).comments,
        {
          comment: commentContent,
          commentAuthor: 'username1',
          commentTime: Date.now()
        }
      ]
    }
    setPosts({
      ...posts,
      [topicId]: updatedPosts
    })
    console.log(comment)
    postsCollection.doc(topicId).update({
      ...updatedPosts
    })
  }

  function updateComment(topicId: string, commentContent: string) {
    setComment({
      ...comment,
      [topicId]: commentContent
    })
  }

  return (
    <TopicListDiv>
      {console.log(posts)}
      <Input
        placeholder='New Topic'
        onChange={(e: any) => setNewTopic(e.target.value)}
      />
      <Button onClick={() => createNewTopic()}>Create</Button>
      <div>
        {Object.keys(posts).map((key: any, i: any) => {
          const obj = posts[key]
          return (
            <div key={`obj-${i}`} className='postObj'>
              <div>{obj.topic}</div>
              <div>{obj.topicAuthor}</div>
              <div>
                {new Date(Number(obj.topicTime)).toLocaleDateString(
                  undefined,
                  TimeOptions
                )}
              </div>
              <div>
                <TextArea
                  placeholder='Your Comment'
                  autoSize={{ minRows: 2, maxRows: 5 }}
                  onChange={(e) => updateComment(key, e.target.value)}
                />
              </div>
              {console.log(posts)}
              <Button onClick={() => submitComment(key)} />
              <div>
                {obj.comments.map((c: any, j: any) => (
                  <div key={`obj-${i}-comment-${j}`}>
                    <div>{c.comment}</div>
                    <div>{c.commentAuthor}</div>
                    <div>
                      {new Date(Number(c.commentTime)).toLocaleDateString(
                        undefined,
                        TimeOptions
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </TopicListDiv>
  )
}

export default Forum
