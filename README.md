## 主要练习DOM操作

通常操作 `DOM` 的步骤

1. 获取 `DOM` 对象
2. 监听相应的 UI 事件
3. 更新 `DOM`

### 获取 `DOM` 对象

常用的方法

- Element.querySelector()
- Element.querySelectorAll()
- Element.getElementById()
- Element.getElementsByTagName()
- Element.getElementsByClassName()

### 监听事件 (重点中的重点)

- EventTarget.addEventListener(type, listener, [useCapture])
- EventTarget.removeEventListener()

#### bubble vs capture 概念

- stopPropagation() / cancelBubble

理解 addEventListener 的第三个参数概念 **useCapture**，[点击这里](https://stackoverflow.com/questions/7398290/unable-to-understand-usecapture-attribute-in-addeventlistener)


### 更新 `DOM`

- Node.insertBefore()
- Node.appendChild()
- Node.replaceChild()
- Node.removeChild()
- Element.innerHTML

### 其他

#### HTMLCollection vs NodeList 区别
