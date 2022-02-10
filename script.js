class ColorPicker {
     constructor(root){
          this.root = root;
          this.colorjoe = colorjoe.rgb(this.root.querySelector('.colorjoe'));
          this.selectedColor = null;
          this.savedColors = this.getSavedColors();
          this.colorjoe.show();
          this.setSelectedColor('#009578');
          this.colorjoe.on('change',color => {
               this.setSelectedColor(color.hex(),true);
          });
          this.root.querySelectorAll('.saved-color').forEach((element,index) => {
               this.showSavedColor(element,this.savedColors[index]);
               element.addEventListener('mouseup',event => {
                    if(event.button == 1){
                         this.saveColor(this.selectedColor,index);
                         this.showSavedColor(element,this.selectedColor);
                    }
                    this.setSelectedColor(element.dataset.color);
               });
          });
     }
     setSelectedColor(color,skipCjUpdate = false){
          this.selectedColor = color;
          this.root.querySelector('.selected-color-text').textContent = color;
          this.root.querySelector('.selected-color').style.backgroundColor = color;
          if(!skipCjUpdate){
               this.colorjoe.set(color);
          }
     }
     getSavedColors(){
          const saved = JSON.parse(localStorage.getItem('colorpicker-saved') || '[]');
          return new Array(5).fill('#ffffff').map((defaultColor,index) => {
               return saved[index] || defaultColor;
          });
     }
     showSavedColor(element,color){
          element.style.backgroundColor = color;
          element.dataset.color = color;
     }
     saveColor(color,index){
          this.savedColors[index] = color;
          localStorage.setItem('colorpicker-saved',JSON.stringify(this.savedColors));
     }
}
const colorPicker = new ColorPicker(document.querySelector('.container'));