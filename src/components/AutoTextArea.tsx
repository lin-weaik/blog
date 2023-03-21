import { Textarea, TextareaProps } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

function AutoTextArea(props: TextareaProps ) {
  const ref = useRef<HTMLTextAreaElement>()

  return <Textarea ref={ref as any} resize="none" { ...props } />
}

export default AutoTextArea