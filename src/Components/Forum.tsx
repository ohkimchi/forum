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
const Forum = () => {
  const [tList, setTList] = useState([])
  const [newTopic, setNewTopic] = useState('')
  const [posts, setPosts] = useState(tList)
  const [comment, setComment] = useState('')
  const { TextArea } = Input

  useEffect(() => {
    const temp = [] as any
    postsCollection.get().then(async (snapshot: any) => {
      await snapshot.forEach((doc: any) => {
        const data = doc.data()
        temp.push({
          topic: data.topic,
          topicAuthor: data.topicAuthor,
          topicTime: data.topicTime,
          comments: data.comments
        })
        setTList(temp)
      })
    })
  }, [])

  useEffect(() => {
    console.log('rerendered', tList)
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

  return (
    <TopicListDiv>
      <Input
        placeholder='New Topic'
        onChange={(e: any) => setNewTopic(e.target.value)}
      />
      <Button onClick={() => createNewTopic()}>Create</Button>
      <div>
        {posts.map((obj: any, i: any) => {
          return (
            <div key={`obj-${i}`} className='postObj'>
              <div>{obj.topic}</div>
              <div>{obj.topicAuthor}</div>
              <div>{obj.topicTime.seconds}</div>
              <div>
                <TextArea
                  placeholder='Your Comment'
                  autoSize={{ minRows: 2, maxRows: 5 }}
                />
              </div>
              <div>
                {obj.comments.map((c: any, j: any) => (
                  <div key={`obj-${i}-comment-${j}`}>
                    <div>{c.comment}</div>
                    <div>{c.commentAuthor}</div>
                    <div>{c.commentTime.seconds}</div>
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
