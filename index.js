      const $ = document.querySelector.bind(document);
      const $$ = document.querySelectorAll.bind(document);
      const heading = $('header h2')
      const img = $('.cd-thumb')
      const audio = $('#audio')
      const cd = $('.cd')
      const playBtn = $('.btn-toggle-play')
      const player = $('.player')
      const progress = $("#progress")
      const prevBtn = $(".btn-prev");
      const nextBtn = $(".btn-next");
      const ranDomBtn = $(".btn-random")
      const repeatBtn = $(".btn-repeat");
      const playList = $(".playlist");
      
  const app = {
    curIndex : 0,
    isRanDom : false,
    isRepeat : false,
      

    songs: [
    {
      name: "Yêu Em Kiểu",
      singer: "Ô Buồn",
      path: "./music/song1.mp3",
      image:
        "https://image.thanhnien.vn/w1024/Uploaded/2022/pwivoviu/2020_09_27/02_vxkd.jpg"
    },
    {
      name: "Cho Ba",
      singer: "Bray",
      path: "./music/song2.mp3",
      image: "https://image.thanhnien.vn/w1024/Uploaded/2022/noktnz/2020_10_14/rich-choi-noi-gi-ve-mau-thuan-voi-bray-3_jrwr.jpg"
    },
    
    {
      name: "Cuối cùng thì",
      singer: "Jack 5 Củ",
      path:
      "./music/song3.mp3",
      image: "https://i.ytimg.com/vi/red9YvYlPWg/maxresdefault.jpg"
    },
    {
      name: "Waiting For You",
      singer: "MONO",
      path: "./music/song4.mp3",
      image:
        "https://i.ytimg.com/vi/okz5RIZRT0U/maxresdefault.jpg"
    },
    {
      name: "Lời Có Cánh",
      singer: "Ô Buồn",
      path: "./music/song5.mp3",
      image:
        "https://image.thanhnien.vn/w1024/Uploaded/2022/pwivoviu/2020_09_27/02_vxkd.jpg"
    },
    {
      name: "Ghép Môi",
      singer: "OSAD",
      path: "./music/song6.mp3",
      image:
        "https://image.thanhnien.vn/w1024/Uploaded/2022/pwivoviu/2020_09_27/02_vxkd.jpg"
    },
    {
      name: "Em Không HIểu",
      singer: "Chang",
      path: "./music/song7.mp3",
      image:
        "https://popnable.com/images/singers/large/changg_vietnam_top_100_241.jpg"
    },
    
  ],

 

  render: function(){
      
      const render = this.songs.map((songs,index) => {
          return `
          <div class="song ${index === _this.curIndex ? 'active' :''}" >
      <div class="thumb" style="background-image: url('${songs.image}')">
      </div>
      <div class="body">
        <h3 class="title">${songs.name}</h3>
        <p class="author">${songs.singer}</p>
      </div>
      <div class="option">
        <i class="fas fa-ellipsis-h"></i>
      </div>
    </div>
          `
      })

      playList.innerHTML = render.join('')
      
    },
    
    handleEvent: function() {
      _this = this

      //// cd quay 

      const imgAnimate = img.animate([
        {transform: 'rotate(365deg)'}
    ],{
        duration: 10000, //seconds
        iterations: Infinity
      })
      imgAnimate.pause()
      
      // sử lý kích thước đĩa CD
      const cdWith = cd.offsetWidth

      document.onscroll = function() {
       const  scrollTop = window.scrollY 
        const newCdWith = cdWith - scrollTop


        
      cd.style.width =newCdWith >0 ? newCdWith + "px"  : 0  +'px'
      cd.style.opacity = newCdWith / cdWith;
      }
      
      // sử lý khi click play 
      playBtn.onclick = function () {
        
          if(_this.isPlaying){
              audio.pause()
          }else{
            audio.play()
          }
      }
      /// khi bai hat dang chay
      audio.onplay = function(){
              _this.isPlaying = true;
              player.classList.add('playing');
              imgAnimate.play()
            }

          /// khi bai hat dang bi pause
          audio.onpause = function(){
              _this.isPlaying = false;
              player.classList.remove('playing');
              imgAnimate.pause()
            }


            //// tiến đọ bài hát thay doi
            audio.ontimeupdate = function(){
              if(audio.duration){
                var progressPersent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPersent;
              }
            }

      ////// tua bai hat 

      progress.onchange = function(e){
              const seek = audio.duration/100 * e.target.value;
              audio.currentTime = seek; 
            }
       /// bai hat tiep theo
       nextBtn.onclick = function() {
        if(_this.isRanDom){
          _this.ranDomSong()
        }else{
          _this.nextSong();
        }
        audio.play()
        _this.render()
          
       }

            // bnai hat truoc
            prevBtn.onclick = function(){
              if(_this.isRanDom){
                _this.ranDomSong()
                audio.play()
              }else{
                _this.prevSong();
                audio.play()
                _this.render()
              }
            }

            ///randoms
            ranDomBtn.onclick = function(){
              _this.isRanDom = ! _this.isRanDom;
              if(_this.isRanDom ){
                _this.isRepeat = false;
              }else{
                _this.isRepeat = true;
              }
              ranDomBtn.classList.toggle('active',_this.isRanDom);

              
              
            }


            /// khi bai hat ket thuc
            audio.onended = function(){
              if(_this.isRepeat){
                  audio.play();
              }else{
                nextBtn.click();  
              }
              
              
            }
            //// nghel lai 1 bai (repeat)
            repeatBtn.onclick = function(){
                _this.isRepeat = ! _this.isRepeat;
                repeatBtn.classList.toggle('active',this.isRepeat);
            }


            // click vao bai hat de phat 

            playList.onclick = function(e){

              console.log(e.target.closest('.song:not(.active)'));
            }
    },

    defineProperties: function (){
      Object.defineProperty(this,'curSong',{
        get: function(){
          return this.songs[this.curIndex]
        }
      })
        
    },


    loadAudio: function(){
      
      heading.textContent = this.curSong.name
      img.style.backgroundImage = `url('${this.curSong.image}')`
      audio.src= this.curSong.path
    },

    nextSong: function() {
        this.curIndex ++;
        if (this.curIndex >= this.songs.length) {
          this.curIndex = 0;
        }
        this.loadAudio()
    },
    prevSong: function(){
      this.curIndex --
      if(this.curIndex < 0){
        this.curIndex = this.songs.length -1
      }
      this.loadAudio()
    },
    ranDomSong: function(){
      let newIndex
      do {
        newIndex = Math.floor(Math.random() * this.songs.length )
      } while(newIndex === this.curIndex)
      this.curIndex = newIndex;
      this.loadAudio()
      
      
    },

  start : function (){
        this.handleEvent(),
        this.render()
        this.defineProperties()
        this.loadAudio()

    }
    
  };
  

app.start();


