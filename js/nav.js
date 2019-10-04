/**
 *  nav.js 核心功能 -- 实现导航栏众多功能的事件处理
 *  理想： 
 *      通过一个类， 处理事件委托， 传递不同的函数和类名， 实现不同的功能
 */

class Nav{
    constructor({el}) {
        this.el = Tool.selectedDom(el)
        this.bindEvent(this.el)
    }

    bindEvent(el) {
        el.addEventListener('mousedown', this.handle.bind(this))
    }

    handle(e) {
        let arr, el, handle
            
        arr = Tool.getParentEl(e.target)
        el = arr.find(item => {
            // 找到父级为a标签并且该 a标签可用
            if( item.classList.contains('available') ){
                return item
            }
        })

        // 如果找到了， 再触发相应函数
        if(el) {
            handle = el.getAttribute('data-handle')
            this[handle] && this[handle]()
        }
    }

    // 导入图片
    ['import-img'] () {
        let file = document.createElement('input')
        file.type = 'file'
        // 限定上传类型
        file.accept = 'image/*'

        // 触发文件窗口
        file.click()

        file.onchange = function(e) {
            let files, url, image, curWidth, curHeight, svgEl

            files = this.files[0]
            // this.files[0].type 文件类型
            // 图片可预览地址
            url = window.URL.createObjectURL( files )
            // 获取图片原本宽高
            image = new Image()
            image.onload = function() {
                curWidth = this.width
                curHeight = this.height

                svgEl = Tool.createSvgEl('image')
                // 图片不显示, 调了半个多小时, 才发现, 这个元素的link属性不能通过attribute设置
                // svgEl.setAttribute('xlink:href', url)
                svgEl.href.baseVal = url
                svgEl.setAttribute('x', 0)
                svgEl.setAttribute('y', 0)
                svgEl.setAttribute('width', curWidth)
                svgEl.setAttribute('height', curHeight)
                
                publicVar.canvas.appendChild(svgEl)

            }
            image.src = url
        }

    }

}
