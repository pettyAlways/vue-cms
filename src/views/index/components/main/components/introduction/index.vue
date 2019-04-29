<template>
  <div class="intro-panel">
    <div class="intro-panel__video">
      <el-row style="height: 100%" type="flex" align="middle">
        <video src="asserts/1234.Ogg" width="100%" height="80%" autoplay="autoplay" controls="controls">
          你的浏览器不支持视频播放器
        </video>
      </el-row>
    </div>
    <div class="intro-panel__text-panel">
      <el-image :src="intrInfo.intrTitle"></el-image>
      <div class="intro-panel__text-panel__text">
        <p style="font-size:14px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"怀庄"牌商标注册于1986年10月20日(注册号：266518），于2015年6月评为“中国驰名商标”。其深厚的文化底蕴、卓越的人文品质，鲜明地表现出其名称和商标图案的设计上，具有强烈的时代感和科技感，让人过目不忘。<br>
          &nbsp;&nbsp;&nbsp; “<strong><span style="color:#E53333;font-size:15px;font-weight:bolder;">怀</span></strong>”：《汉语大辞典》里有包容、包涵、聚积之意。引申为：海纳百川、有容乃大，集腋成裘、积少成多。“怀”又是中国酒都贵州仁怀的简称。<br>
          &nbsp;&nbsp;&nbsp;&nbsp;“<strong><span style="color:#E53333;font-size:15px;font-weight:bolder;">庄</span></strong>”：（繁体写作“莊”）庄家、坐庄、酒庄。《汉语大辞典》里“庄”有四面八达之意。周易“庄”为广土，土五行生金。古文中广即厂，元周伯琦《六书正伪》：“莊：草芽之壮也”。寓意草木丰茂，人杰地灵，企业兴旺发达......
          <a href="/wine/detail-100112-906.htm" title="品牌故事">&nbsp;&nbsp;详细&gt;&gt;</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'inroduction',
    data() {
      return {
        intrInfo: {
          intrTitle: require('./asserts/introduction-pic.jpg'),
          intrContent: ''
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .intro-panel {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 15px;
    &__video {
      flex-shrink: 0;
      width: 400px;
      height: 334px;
    }
    &__text-panel {
      width: 532px;
      &__text {
        margin-top: 10px;
        font-family: "微软雅黑";
        line-height: 28px;
        font-size: 14px;
        a {
          color: red;
          text-decoration: none;

        }
      }
    }

  }
</style>
