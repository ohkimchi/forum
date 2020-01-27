import Button from '@material-ui/core/Button'
import {
  default as TextArea,
  default as TextField
} from '@material-ui/core/TextField'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { AppContext } from '../App/AppReducer'
import { postsCollection } from '../utils/firebase'

const InputDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`
const PostDiv = styled.div`
  margin: 10px;
  background: #d3d3d3;
  padding: 5px;
`

const TopicListDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px auto auto auto;
  width: 90vw;
`

const AuthorDateDiv = styled.div`
  font-size: 10px;
  color: grey;
  text-align: right;
`

const TwoBlockDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;
`
const CommentBlockDiv = styled.div`
  margin: 15px;
  font-size: smaller;
  padding: 5px;
`

const TimeOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}

const Forum = () => {
  const { state } = useContext(AppContext)
  const [posts, setPosts] = useState({} as any)
  const [newTopic, setNewTopic] = useState('')
  const [comment, setComment] = useState({} as any)
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
      })
    })
    setPosts(temp)
  }

  useEffect(() => {
    getAllPosts()
  }, [])

  async function createNewTopic() {
    if (newTopic !== '') {
      postsCollection.add({
        topic: newTopic,
        topicAuthor: state.username,
        topicTime: Date.now(),
        comments: []
      })
      await getAllPosts()
      setNewTopic('')
    }
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
    setComment({
      ...comment,
      [topicId]: ''
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
      <InputDiv>
        <TextField
          id='standard=basic'
          label='New Topic'
          onChange={(e: any) => setNewTopic(e.target.value)}
          value={newTopic}
        />

        <Button size='small' color='primary' onClick={() => createNewTopic()}>
          Create
        </Button>
      </InputDiv>

      <div>
        {Object.keys(posts).map((key: any, i: any) => {
          const obj = posts[key]
          return (
            <PostDiv key={`post-${i}`}>
              <TwoBlockDiv key={`post-topic-block-${key}`}>
                <div>{obj.topic}</div>
                <div>
                  <AuthorDateDiv>{obj.topicAuthor}</AuthorDateDiv>
                  <AuthorDateDiv>
                    {new Date(obj.topicTime).toLocaleDateString(
                      undefined,
                      TimeOptions
                    )}
                  </AuthorDateDiv>
                </div>
              </TwoBlockDiv>

              <TwoBlockDiv key={`post-comment-block-${key}`}>
                <div key={`new-comment-${i}`}>
                  <TextArea
                    label='Your Comment'
                    multiline
                    rows='3'
                    key={`new-comment-${key}`}
                    onChange={(e: any) => updateComment(key, e.target.value)}
                    defaultValue={defaultComment}
                    value={comment[key]}
                  />
                </div>
                <div>
                  <Button
                    variant='contained'
                    size='small'
                    onClick={() => submitComment(key)}
                  >
                    Comment
                  </Button>
                </div>
              </TwoBlockDiv>

              <CommentBlockDiv key={`obj-${key}-comment-block`}>
                {obj.comments.map((c: any, j: any) => {
                  return (
                    <TwoBlockDiv key={`obj-${key}-comment-${j}`}>
                      <div>{c.comment}</div>
                      <div>
                        <AuthorDateDiv>{c.commentAuthor}</AuthorDateDiv>
                        <AuthorDateDiv>
                          {new Date(c.commentTime).toLocaleDateString(
                            undefined,
                            TimeOptions
                          )}
                        </AuthorDateDiv>
                      </div>
                    </TwoBlockDiv>
                  )
                })}
              </CommentBlockDiv>
            </PostDiv>
          )
        })}
      </div>
    </TopicListDiv>
  )
}

export default Forum
