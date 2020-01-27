import TextArea from '@material-ui/core/TextField'
import { Button, Input } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { AppContext } from '../App/AppReducer'
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
  const { state } = useContext(AppContext)
  const [tList, setTList] = useState({})
  const [newTopic, setNewTopic] = useState('')
  const [posts, setPosts] = useState(tList as any)
  const [comment, setComment] = useState({})
  const defaultComment = ''

  async function getAllPosts() {
    const temp = {} as any
    await postsCollection.get().then(async (snapshot: any) => {
      await snapshot.forEach((doc: any) => {
        const data = doc.data()
        const docId = doc.id
        temp[docId] = {
          topic: data.topic,
          topicAuthor: data.topicAuthor,
          topicTime: data.topicTime,
          comments: data.comments
        }
        setTList(temp)
      })
    })
  }

  useEffect(() => {
    getAllPosts()
  }, [])

  useEffect(() => {
    setPosts(tList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tList])

  async function createNewTopic() {
    postsCollection.add({
      topic: newTopic,
      topicAuthor: state.username,
      topicTime: Date.now(),
      comments: []
    })
    await getAllPosts()
  }

  function submitComment(topicId: string) {
    const commentContent = (comment as any)[topicId]
    const updatedPosts = {
      ...posts[topicId],
      comments: [
        ...(posts[topicId] as any).comments,
        {
          comment: commentContent,
          commentAuthor: state.username,
          commentTime: Date.now()
        }
      ]
    }
    setPosts({
      ...posts,
      [topicId]: updatedPosts
    })
    postsCollection.doc(topicId).update({
      ...updatedPosts
    })
  }

  function updateComment(topicId: string, commentContent: string) {
    console.log(comment)
    setComment({
      ...comment,
      [topicId]: commentContent
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
        {Object.keys(posts).map((key: any, i: any) => {
          const obj = posts[key]
          console.log(obj.topic)
          return (
            <div key={`obj-${i}`} className='postObj'>
              <div>{obj.topic}</div>
              <div>{obj.topicAuthor}</div>
              <div>
                {new Date(obj.topicTime).toLocaleDateString(
                  undefined,
                  TimeOptions
                )}
              </div>
              <div key={`new-comment-${i}`}>
                <TextArea
                  label='Your Comment'
                  multiline
                  rows='4'
                  key={`new-comment-${key}`}
                  onChange={(e: any) => updateComment(key, e.target.value)}
                  defaultValue={defaultComment}
                />
              </div>
              <Button onClick={() => submitComment(key)} />
              <div key={`obj-${i}-comment-block`}>
                {obj.comments.map((c: any, j: any) => {
                  return (
                    <div key={`obj-${i}-comment-${j}`}>
                      <div>{c.comment}</div>
                      <div>{c.commentAuthor}</div>
                      <div>
                        {new Date(c.commentTime).toLocaleDateString(
                          undefined,
                          TimeOptions
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </TopicListDiv>
  )
}

export default Forum
