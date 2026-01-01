import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

export type QuillEditorHandle = {
  undo: () => void;
  redo: () => void;
};

type Props = {
  value: string;
  onChange: (text: string) => void;
  onHistoryChange?: (state: { canUndo: boolean; canRedo: boolean }) => void;
};

const QuillEditor = forwardRef<QuillEditorHandle, Props> (
  ({ value, onChange , onHistoryChange}, ref) => {
    const webViewRef = useRef<WebView> (null);
    const didInit = useRef (false);
    
    const sendToQuill = (type: string, payload?: any) => {
      webViewRef.current?.postMessage (
        JSON.stringify ({ type, payload }),
      );
    };
    
    const undo = () => {
      sendToQuill ('UNDO');
    };
    
    const redo = () => {
      sendToQuill ('REDO');
    };
    
    useImperativeHandle (ref, () => ({
      undo,
      redo,
    }));
    
    const onMessage = (e: any) => {
      const { type, payload } = JSON.parse (e.nativeEvent.data);
      
      switch (type) {
        case 'CHANGE':
          onChange (payload.text);
          break;
        
        case 'HISTORY':
          onHistoryChange?. ({
            canUndo: payload.canUndo,
            canRedo: payload.canRedo,
          });
          break;
      }
    };
    
    return (
      <View style={{ flex: 1 }}>
        <WebView
          ref={webViewRef}
          source={require ('./quill.html')}
          originWhitelist={['*']}
          javaScriptEnabled
          allowFileAccess
          allowUniversalAccessFromFileURLs
          style={{ flex: 1 }}
          onMessage={onMessage}
          onLoadEnd={() => {
            if ( !didInit.current) {
              sendToQuill ('SET_TEXT', { text: value });
              didInit.current = true;
            }
          }}
        />
      </View>
    );
  },
);

export default QuillEditor;
