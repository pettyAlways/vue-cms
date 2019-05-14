<template>
  <div class="knowledge-cover">
    <div class="knowledge-cover__info">
      <div class="knowledge-cover__info__left">
        <img :src="require('./assets/knowledge01.jpg')">
      </div>
      <div class="knowledge-cover__info__right">
        <div class="title">
          <span>分布式应用</span>
        </div>
        <div class="author">
          <span>作者：</span>
          <ul>
            <li v-for="index in 5" :key="index"><a><img :src="require('./assets/author01.jpg')"></a></li>
          </ul>
        </div>
        <div class="introduce">
          <span>简介：</span>
          <div class="content"><a>互联网应用避免不免面临大量用户涌入导致应用服务器的资源瓶颈，如何做到应用的高可用易扩展和安全就是考验架构师的能力水平...</a></div>
        </div>
        <div class="category">
          <span>所属分类：</span>
          <div class="content"><a>Java Web</a></div>
        </div>
        <div class="statistic">
          <ul>
            <li>
              <span>117</span>
              <span>篇文章</span>
            </li>
            <li>
              <span>17</span>
              <span>个点赞</span>
            </li>
            <li>
              <span>27</span>
              <span>个评论</span>
            </li>
            <li>
              <span>5</span>
              <span>个贡献者</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="knowledge-cover__join">
      <span>+ 关注</span>
      <span>+ 申请加入</span>
      <span>+ 点赞</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'knowledgeCover'
  }
</script>

<style lang="scss" scoped>
  .knowledge-cover {
    margin-top: 15px;
    position: relative;
    border-bottom: 1px solid #e6e6e6;
    border-right: 1px solid #e6e6e6;
    &__info {
      display: flex;
      height: 230px;
      &__left {
        flex-shrink: 0;
        img {
          width: 160px;
          height: 200px;
          object-fit: cover;
        }
      }
      &__right {
        width: 550px;
        margin-left: 15px;
        div {
          font-size: 14px;
          margin-bottom: 10px;
        }
        .title {
          font-size: 18px;
          font-weight: 700;
        }
        .author {
          display: flex;
          span {
            line-height: 25px;
            flex-shrink: 0;
          }
          ul {
            display: flex;
            list-style: none;
            padding: 0px;
            li {
              margin-left: 10px;
              img {
                width: 25px;
                height: 25px;
                object-fit: cover;
                border-radius: 50%;
                border: 2px solid rosybrown;
              }
            }
          }
        }
        .introduce {
          display: flex;
          span {
            flex-shrink: 0;
          }
          .content {
            margin-left: 10px;
            flex-wrap: wrap;
            color:  #737373;
          }
        }
        .category {
          display: flex;
          span {
            flex-shrink: 0;
          }
          .content {
            margin-left: 10px;
            a {
              color: #4c84be;
              cursor: pointer;
              &:hover {
                color: #409EFF;
              }
            }
          }
        }
        .statistic {
          ul {
            display: flex;
            list-style: none;
            padding: 0px;
            li {
              margin-right: 15px;
              span:nth-of-type(1) {
                font: 20px/22px Arial;
                font-weight: 400;
                font-family: 'yMxThZoL';
                color: #262626;
              }
              span:nth-of-type(2) {
                font: 12px/20px PingFangSC-Regular,'-apple-system',Simsun;
                color: #666;
              }
            }
          }
        }
      }
    }
    &__join {
      position: absolute;
      display: flex;
      flex-direction: column;
      top: 40%;
      right: 0px;
      span {
        font-size: 18px;
      }
    }


  }
</style>
