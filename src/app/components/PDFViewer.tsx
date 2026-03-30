import { useEffect, useState } from 'react';
import { View, StyleSheet, usePDF } from '@react-pdf/renderer';

type Props = {
  height?: string | number
  width?: string | number
}

const PDFViewer = ({
  title,
  style,
  className,
  fileName,
  children,
  innerRef,
  ...props
}: any) => {
  const [instance, updateInstance] = usePDF({ document: children });
  const [url, set] = useState<any>();

  useEffect(() => {
    if (instance.blob) {
      set(
        URL.createObjectURL(
          new File([instance.blob], fileName, {
            type: instance.blob.type
          })
        )
      );
    }
  }, [instance]);

  useEffect(updateInstance, [children]);

  return (
    <iframe
      title={title}
      ref={innerRef}
      width="100%"
      height={800}
      src={url}
      className={className}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  page: {
    paddingVertical: 25,
    paddingHorizontal: 25,
    flexDirection: 'column',
    backgroundColor: '#F5F8FA'
  },
  header:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  row: {
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  text:{
    fontSize:11,
    fontWeight: 'bold',
    lineHeight:1.5,
  },
  textPayment:{
    fontSize:14,
    fontWeight: 'bold',
    lineHeight:1.5,
  },
  textHeader:{
    color:"#fff"
  },
  textItem:{
    color:"#000"
  },
  textData:{
    color:"#a22"
  },
  cellHeader:{
    backgroundColor:"#1f487c",
    height:20,
    alignItems:'center',
    justifyContent:'center',
    border:'none',
    borderStyle:'solid',
    borderWidth:1,
    borderColor:"#000",
    borderRightColor:"#fff",
    borderLeftWidth:0
  },
  cellItems:{
    backgroundColor:"#fff",
    height:40,
    alignItems:'center',
    justifyContent:'center',
    border:'none',
    borderStyle:'dotted',
    borderWidth:1,
    borderColor:"#777",
    borderRightColor:"#fff",
    borderLeftWidth:0
  },
  table: {
    flexDirection: 'column',
  },
  tableRow: {
    flexDirection: "row",
  },
  flex1: {
    flex: 1,
  },
  flex3: {
    flex: 3,
  },
  blendedHeader: {
    backgroundColor: '#1f487c',
    borderBottomWidth: 0,
  },
  blendedHeaderBottom: {
    backgroundColor: '#1f487c',
    borderTopWidth: 0,
  },
});

const Gap = ({height, width}: Props) => {
  return (
    <View style={{height, width}} />
  )
}

export { PDFViewer, styles, Gap }