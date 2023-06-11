import styles from '@/styles/button/button2.module.css'
import { useEffect, useState } from 'react'
import {useRouter} from 'next/router'

const Button2 = (props) => {
    const router = useRouter()
    const estilo = props.className || styles.botao
    return (
        <button
            className={styles.botao2}
            onClick={()=>router.push(props.LinkTO)}
            style={{
                border: props.border,
                backgroundColor: props.backgroundColor,
                boxShadow: props.shadow,
                width: props.width,
                color: props.cor,
                padding: props.padding,
                position: props.position,
                marginBottom: props.marginBottom,
                marginLeft: props.marginLeft,
                marginRight: props.marginRight,
                fontSize: props.fontSize,
                marginTop: props.marginTop,
            }} >
            {props.children}
        </button>
    )
}
export default Button2