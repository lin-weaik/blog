import AutoTextArea from "@/components/AutoTextArea"
import { NEXT_PUBLIC_RESUME_ID } from "@/constants/const"
import { ArrowBackIcon, CheckIcon, CopyIcon, EditIcon } from "@chakra-ui/icons"
import { Box, Button, Container, CSSReset, Divider, Flex, IconButton, Stack, styled, Textarea } from "@chakra-ui/react"
import { marked } from "marked"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useMemo, useState } from "react"
import { useMutation, useQuery } from "../../convex/_generated/react"

const markdownStyle = '<link rel="stylesheet" href="/github-markdown.min.css" />'

function getQueryString(path: string, name: string) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = path.split('?')?.[1]?.match(reg);
  if (r) {
      return unescape(r[2]);
  }
  return null;
}

function Resume() {
  const router = useRouter()
  const [id, setId] = useState(getQueryString(router.asPath, 'id') || NEXT_PUBLIC_RESUME_ID)
  const [value, setValue] = useState('')
  const [edit, setEdit] = useState(false)
  const [copying, setCopying] = useState(false)
  const [submiting, setSubmiting] = useState(false)
  const mutationResume = useMutation('mutationResume')
  const resume = useQuery('getResume', id)
  const handleInput = (e: any) => {
    setValue(e.target.value)
  }
  const valueHtml = useMemo(() => {
    return `<div class="markdown-body">${marked.parse(value)}</div>` + markdownStyle
  }, [value])

  useEffect(() => {
    if (resume) {
      setValue(resume.context)
    }
  }, [resume])

  const handleClick = async () => {
    if (!edit) {
      setEdit(true)
    } else {
      setSubmiting(true)
      const res = await mutationResume(value, id)
      res?.id && setId(res.id)
      if (res?.id !== NEXT_PUBLIC_RESUME_ID) {
        res?.id && router.push('', `?id=${res?.id}`, {
          shallow: true
        })
      }
      setSubmiting(false)
      // setEdit(false)
    }
  }

  const handleCopy = async () => {
    setCopying(true)
    const res = await mutationResume(value)
    window.open(`?id=${res?.id}`)
    setCopying(false)
  }

  return (
    <Box display='flex' flexDir="column" height="100vh">
      <IconButton pos='absolute' zIndex={1} right={100} top={30} aria-label={""} onClick={handleClick} isLoading={submiting}>
        {edit ? <CheckIcon /> : <EditIcon />}
      </IconButton>
      {edit && (<IconButton pos='absolute' zIndex={1} right={150} top={30} aria-label={""} onClick={() => setEdit(false)}>
        <ArrowBackIcon />
      </IconButton>)}
      <IconButton pos='absolute' zIndex={1} right={50} top={30} aria-label={""} onClick={handleCopy} isLoading={copying}>
        <CopyIcon />
      </IconButton>

      <Box height="120" pos="relative">
        <Image src="https://api.mfstudio.cc/bing/" alt="bg" fill style={{ objectFit: 'cover' }} />
      </Box>
      <Flex flex="1" overflowY="auto" pos="relative" >
        <Box width={edit ? '50%' : 0} transition="all ease 600ms" opacity={edit ? 1 : 0} height="100%" p="4">
          <AutoTextArea
            resize="none"
            value={value}
            h="100%"
            onInput={handleInput}
            border='none'
            p={0}
            _focusVisible={{ boxShadow: 'none' }}
            borderRadius={0}
            placeholder="请输入..." />
        </Box>
        <Divider orientation='vertical' transition="all ease 600ms" opacity={edit ? 1 : 0} />
        <Box width={edit ? '50%' : '100%'} transition="width ease 600ms">
          <iframe srcDoc={valueHtml} width="100%" style={{ height: '100%' }} />
        </Box>
      </Flex>
    </Box>
  )
}

export default Resume