import React, { useEffect, useRef } from 'react';
import { Prompt as RouterPrompt, PromptProps } from 'react-router';
import { FCProps } from 'src/shared/types/FCProps';

interface OwnProps extends PromptProps {}

type Props = FCProps<OwnProps>;

export function Prompt(props: Props) {
  const { when, message } = props;
  const whenRef = useRef(when);
  const messageRef = useRef(message);
  useEffect(() => {
    whenRef.current = when;
    messageRef.current = message;
  }, [when, message]);
  useEffect(() => {
    const handler = (e: WindowEventMap['beforeunload']) => {
      if (whenRef.current) {
        const confirmationMessage = messageRef.current;

        e.returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage; //Webkit, Safari, Chrome etc.
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => {
      window.removeEventListener('beforeunload', handler);
    };
  }, []);
  return <RouterPrompt {...props} />;
}
