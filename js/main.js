
class Process {
    
    constructor(){
        this.tabWrapper = 'ext-tabs'
        this.$tabs = $(`.${this.tabWrapper} a`);
        this.className = 'active';
        this.interval;

        /* Slider Config */
        this.autoSlide = true;
        this.intervalTime = 5000;
        
        /* enable tab feature */
        this.switchTab();

        /* enable auto slide */
        this.autoSlide && this.identifyLastChild();
    }

    switchTab(){
        let _this = this;
        this.$tabs.on('click', function(){
            const targetId = $(this).attr('href');
            $(this).addClass(_this.className).siblings().removeClass(_this.className);
            $(targetId).addClass(_this.className).siblings().removeClass(_this.className);
            
            if(_this.autoSlide)
                _this.stopAutoSlide();
                _this.enableAutoSlide();
            
        })  
    }

    identifyLastChild(){
        this.$tabs.last().attr('item', 'last');
        this.enableAutoSlide();
    }

    stopAutoSlide(){
        clearInterval( this.interval );
    }

    enableAutoSlide(){
        this.interval = setInterval( ()=>{
            this.jumpToNext( this );
        }, this.intervalTime )
    }

    jumpToNext(_this){
        $(`.${this.tabWrapper} a.${this.className}`).is('[item]')
            ? this.$tabs.first().trigger('click')
            : $(`.${this.tabWrapper} a.${this.className}`).next().trigger('click')
    }
}

jQuery(document).ready( function(){
    new Process();
})
