import{useCallback,useEffect,useState}from'react'
export function useLocalStorage<T>(key:string,initial:T){const[value,setValue]=useState<T>(()=>{try{const x=localStorage.getItem(key);return x?JSON.parse(x):initial}catch{return initial}});useEffect(()=>localStorage.setItem(key,JSON.stringify(value)),[key,value]);return[value,setValue,useCallback(()=>setValue(initial),[initial])]as const}
