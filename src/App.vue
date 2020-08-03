<template>
  <div id="app">
    <div v-loading="status" v-if="status"  data-mu-loading-overlay-color="rgba(0, 0, 0, .6)"></div>
    <div v-else>
      <div class="fixc" v-show="fixc">
        <div>
          <p>疫情地区</p>
          <p>新增</p>
          <p>现有</p>
          <p>累计</p>
          <p>治愈</p>
          <p>死亡</p>
        </div>
      </div>
      <div class="main">
        <p class="tit">{{dataObj.title}}</p>
        <p class="updata-time">更新时间：{{dataObj.mapLastUpdatedTime}}</p>
        <p class="in-t">国内疫情</p>
        <ul class="indata ovf">
          <li>
            <p class="indata-t">现有确诊</p>
            <p class="in-n confirmed">{{summaryDataIn.curConfirm}}</p>
            <p class="add">
              昨日
              <span>{{summaryDataIn.curConfirmRelative|msgFormat}}</span>
            </p>
          </li>
          <li>
            <p class="indata-t">无症状</p>
            <p class="in-n unconfirmed">{{summaryDataIn.asymptomatic}}</p>
            <p class="add">
              昨日
              <span>{{summaryDataIn.asymptomaticRelative|msgFormat}}</span>
            </p>
          </li>
          <li>
            <p class="indata-t">现有疑似</p>
            <p class="in-n unconfirmed">{{summaryDataIn.unconfirmed}}</p>
            <p class="add">
              昨日
              <span>{{summaryDataIn.unconfirmedRelative|msgFormat}}</span>
            </p>
          </li>

          <li>
            <p class="indata-t">现有重症</p>
            <p class="in-n cured">{{summaryDataIn.icu}}</p>
            <p class="add">
              昨日
              <span>{{summaryDataIn.icuRelative|msgFormat}}</span>
            </p>
          </li>
          <li>
            <p class="indata-t">累计确诊</p>
            <p class="in-n confirmed">{{summaryDataIn.confirmed}}</p>
            <p class="add">
              昨日
              <span>{{summaryDataIn.confirmedRelative|msgFormat}}</span>
            </p>
          </li>
          <li>
            <p class="indata-t">境外输入</p>
            <p class="in-n died">{{summaryDataIn.overseasInput}}</p>
            <p class="add">
              昨日
              <span>{{summaryDataIn.overseasInputRelative|msgFormat}}</span>
            </p>
          </li>
          <li>
            <p class="indata-t">累计治愈</p>
            <p class="in-n cured">{{summaryDataIn.cured}}</p>
            <p class="add">
              昨日
              <span>{{summaryDataIn.curedRelative|msgFormat}}</span>
            </p>
          </li>
          <li>
            <p class="indata-t">累计死亡</p>
            <p class="in-n died">{{summaryDataIn.died}}</p>
            <p class="add">
              昨日
              <span>{{summaryDataIn.diedRelative|msgFormat}}</span>
            </p>
          </li>
        </ul>
        <p class="dataSource">数据来自官方通报 全国与各省通报数据可能存在差异</p>
        <mu-tabs
          :value.sync="active1"
          inverse
          color="#00bec9"
          @change="changeTab"
          indicator-color="#00bec9"
          text-color="rgba(0, 0, 0, .54)"
          center
        >
          <mu-tab>现有确诊</mu-tab>
          <mu-tab>累计确诊</mu-tab>
        </mu-tabs>
        <div class="chats"></div>
        <p class="iitit">现有无症状分布</p>
        <div class="bar"></div>
        <p class="iitit">新增确诊分布</p>
        <div class="bar1"></div>
        <table class="inlist">
          <thead class="inlist-t ovf">
            <th>
              <div>疫情地区</div>
            </th>
            <th>
              <div>新增</div>
            </th>
            <th>
              <div>现有</div>
            </th>
            <th>
              <div>累计</div>
            </th>
            <th>
              <div>治愈</div>
            </th>
            <th>
              <div>死亡</div>
            </th>
          </thead>
          <tbody class="inbody">
            <tr v-for="(item,index) in caseList" :key="index">
              <td>
                <div class="area" @click="openFullscreenDialog(item)">{{item.area}}</div>
              </td>
              <td class="table-item">{{item.confirmedRelative}}</td>
              <td class="table-item">{{item.curConfirm}}</td>
              <td class="table-item">{{item.confirmed}}</td>
              <td class="table-item">{{item.crued}}</td>
              <td class="table-item">{{item.died}}</td>
            </tr>
          </tbody>
        </table>
        <p class="in-t itopend">国外疫情</p>
        <ul class="indata ovf">
          <li>
            <p class="indata-t">现有确诊</p>
            <p class="in-n confirmed-o">{{summaryDataOut.curConfirm}}</p>
            <p class="add">
              昨日
              <span>{{summaryDataOut.curConfirmRelative|msgFormat}}</span>
            </p>
          </li>
          <li>
            <p class="indata-t">累计确诊</p>
            <p class="in-n unconfirmed-o">{{summaryDataOut.confirmed}}</p>
            <p class="add">
              昨日
              <span>{{summaryDataOut.confirmedRelative|msgFormat}}</span>
            </p>
          </li>
          <li>
            <p class="indata-t">累计治愈</p>
            <p class="in-n cured-o">{{summaryDataOut.cured}}</p>
            <p class="add">
              昨日
              <span>{{summaryDataOut.curedRelative|msgFormat}}</span>
            </p>
          </li>
          <li>
            <p class="indata-t">累计死亡</p>
            <p class="in-n died-o">{{summaryDataOut.died}}</p>
            <p class="add">
              昨日
              <span>{{summaryDataOut.diedRelative|msgFormat}}</span>
            </p>
          </li>
        </ul>
        <p class="iitit">新增确诊国家Top10</p>
        <div class="bar2"></div>
        <table class="inlist-o">
          <thead class="inlist-t ovf">
            <th>
              <div>疫情地区</div>
            </th>
            <th>
              <div>新增</div>
            </th>
            <th>
              <div>现有</div>
            </th>
            <th>
              <div>累计</div>
            </th>
            <th>
              <div>治愈</div>
            </th>
            <th>
              <div>死亡</div>
            </th>
          </thead>
          <tbody class="inbody-o">
            <tr v-for="(item,index) in caseOutsideList" :key="index">
              <td class="area">{{item.area}}</td>
              <td class="table-item">{{item.confirmedRelative}}</td>
              <td class="table-item">{{item.curConfirm}}</td>
              <td class="table-item">{{item.confirmed}}</td>
              <td class="table-item">{{item.crued}}</td>
              <td class="table-item">{{item.died}}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openFullscreen">
        <mu-appbar color="#00bec9" :title="areatit">
          <mu-button slot="left" icon @click="closeFullscreenDialog">
            <mu-icon value="close"></mu-icon>
          </mu-button>
        </mu-appbar>
        <div class="box">
          <div class="fixz" v-show="openFullscreen">
            <div>
              <p>疫情地区</p>
              <p>新增</p>
              <p>现有</p>
              <p>累计</p>
              <p>治愈</p>
              <p>死亡</p>
            </div>
          </div>
          <table class="inlist-x">
            <tbody class="inbody-x">
              <tr v-for="(item,index) in subs" :key="index">
                <td class="area">{{item.city}}</td>
                <td class="table-item">{{item.confirmedRelative}}</td>
                <td class="table-item">{{item.curConfirm}}</td>
                <td class="table-item">{{item.confirmed}}</td>
                <td class="table-item">{{item.crued}}</td>
                <td class="table-item">{{item.died}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </mu-dialog>
    </div>
  </div>
</template>

<script>
import "./assets/js/china";
export default {
  name: "App",
  data() {
    return {
      dataObj: {},
      summaryDataIn: "", //国内
      summaryDataOut: "", //国外
      caseList: [], //国内
      caseOutsideList: [], //国外
      subs: [],
      areatit: "",
      status: true,
      fixc: false,
      openFullscreen: false,
      list: [],
      active1: 0,
      active2: 0,
      asymptomaticTopProvince:[],
      newAddTopProvince:[],
      topAddCountry:[]
    };
  },
  methods: {
    changeTab() {
      this.echarts();
    },
    openFullscreenDialog(i) {
      if (i.subList.length != 0) {
        this.areatit = i.area;
        this.subs = i.subList;
        this.openFullscreen = true;
      }
    },
    closeFullscreenDialog() {
      this.openFullscreen = false;
    },
    scrollFix() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var itop = document.querySelector(".inlist").offsetTop;
      var itopend =  document.querySelector(".itopend").offsetTop;
      var inlisto = document.querySelector(".inlist-o").offsetTop;
      if (scrollTop > itop && scrollTop < itopend) {
        this.fixc = true;
      } else if (scrollTop > inlisto) {
        this.fixc = true;
      } else {
        this.fixc = false;
      }
    },
    echarts() {
      var myChart = this.$echarts.init(document.querySelector(".chats"));
      this.list = [];
      if (this.active1 == 0) {
        for (let index = 0; index < this.caseList.length; index++) {
          this.list.push({
            name: this.caseList[index].area,
            value: this.caseList[index].curConfirm,
          });
        }
      } else {
        for (let index = 0; index < this.caseList.length; index++) {
          this.list.push({
            name: this.caseList[index].area,
            value: this.caseList[index].confirmed,
          });
        }
      }
      // eslint-disable-next-line no-unused-vars
      var option = {
        tooltip: {
          triggerOn: "click",
        },
        visualMap: {
          min: 0,
          max: 1000,
          left: 26,
          bottom: 0,
          showLabel: !0,
          text: ["高", "低"],
          pieces: [
            {
              gt: 10000,
              label: "> 10000",
              color: "#7f1100",
            },
            {
              gte: 1000,
              lte: 9999,
              label: "1000 - 9999",
              color: "#ff5428",
            },
            {
              gte: 100,
              lt: 999,
              label: "100 - 999",
              color: "#ff8c71",
            },
            {
              gte: 10,
              lt: 99,
              label: "10 - 99",
              color: "#ef9a9a",
            },
            {
              gte: 1,
              lt: 9,
              label: "1 - 9",
              color: "#ffcdd2",
            },
            {
              value: 0,
              color: "#00e676",
            },
          ],
          show: !0,
        },
        geo: {
          map: "china",
          roam: !1,
          scaleLimit: {
            min: 1,
            max: 2,
          },
          zoom: 1.23,
          top: 80,
          label: {
            normal: {
              show: !0,
              fontSize: "8",
              color: "rgba(0,0,0,0.7)",
            },
          },
          itemStyle: {
            normal: {
              borderColor: "rgba(0, 0, 0, 0.2)",
            },
            emphasis: {
              areaColor: "#f2d5ad",
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              borderWidth: 0,
            },
          },
        },
        series: [
          {
            name: "确诊病例",
            type: "map",
            geoIndex: 0,
            data: this.list,
          },
        ],
      };
      myChart.setOption(option);
    },
    barchats1(){
      var myChart = this.$echarts.init(document.querySelector(".bar1"));
      var namearr1=[];
      var localarr=[];
      var overseasarr=[];
         this.newAddTopProvince.forEach((item) => {
          namearr1.push(item.name);
          localarr.push(item.local);
          overseasarr.push(item.overseasInput);
        });
        var option = {
        color: ['#7f1100', '#3f51b5'],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "0%",
          top: "10%",
          containLabel: true,
        },
        legend:{
						show:true,
						top: 0,
						right:0,
						data:['本土输入','境外输入'],
						textStyle:{
							color: "#666"
						}
					},
        xAxis: [
          {
            type: "category",
            data: namearr1,
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#666", //更改坐标轴文字颜色
                fontSize: 12, //更改坐标轴文字大小
                fontFamily: "微软雅黑",
                fontStyle: "normal",
              },
              rotate: 50,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              show: true,
              textStyle: {
                color: "#666", //更改坐标轴文字颜色
                fontSize: 14, //更改坐标轴文字大小
              },
            },
          },
        ],
        series: [
          {
            name: "本土输入",
            type: "bar",
            barWidth: "15%",
            data: localarr,
            itemStyle: {
              emphasis: {
                barBorderRadius: 7,
              },
              normal: {
                barBorderRadius: 7,
                label: {
                  show: false, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "black",
                    fontSize: 16,
                  },
                },
              },
            },
          },
          {
            name: "境外输入",
            type: "bar",
            barWidth: "15%",
            data: overseasarr,
            itemStyle: {
              emphasis: {
                barBorderRadius: 7,
              },
              normal: {
                barBorderRadius: 7,
                label: {
                  show: false, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "black",
                    fontSize: 16,
                  },
                },
              },
            },
          },
        ],
      };
      myChart.setOption(option);
    },
    barchats() {
      var myChart = this.$echarts.init(document.querySelector(".bar"));
      var namearr=[];
      var valuearr=[];
      if (this.active2 == 0) {
        this.asymptomaticTopProvince.forEach((item) => {
          namearr.push(item.name);
          valuearr.push(item.value);
        });
        var option = {
          color: ["#3398DB"],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
            },
          },
          grid: {
            left: "0%",
            top: "10%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              data: namearr,
              axisTick: {
                alignWithLabel: true,
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#666", //更改坐标轴文字颜色
                  fontSize: 12, //更改坐标轴文字大小
                  fontFamily: "微软雅黑",
                  fontStyle: "normal",
                },
                rotate: 50,
              },
            },
          ],
          yAxis: [
            {
              type: "value",
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#666", //更改坐标轴文字颜色
                  fontSize: 14, //更改坐标轴文字大小
                },
              },
            },
          ],
          series: [
            {
              name: "全国 无症状感染者分布",
              type: "bar",
              barWidth: "15%",
              data: valuearr,
              itemStyle: {
                emphasis: {
                  barBorderRadius: 7,
                },
                normal: {
                  barBorderRadius: 7,
                  label: {
                    show: false, //开启显示
                    position: "top", //在上方显示
                    textStyle: {
                      //数值样式
                      color: "black",
                      fontSize: 16,
                    },
                  },
                },
              },
            },
          ],
        };
      } 
      myChart.setOption(option);
    },
    barchats2() {
      var myChart = this.$echarts.init(document.querySelector(".bar2"));
      var namearr=[];
      var valuearr=[];
      if (this.active2 == 0) {
        this.topAddCountry.forEach((item) => {
          namearr.push(item.name);
          valuearr.push(item.value);
        });
        var option = {
          color: ["#fdd835"],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
            },
          },
          grid: {
            left: "0%",
            top: "10%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              data: namearr,
              axisTick: {
                alignWithLabel: true,
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#666", //更改坐标轴文字颜色
                  fontSize: 12, //更改坐标轴文字大小
                  fontFamily: "微软雅黑",
                  fontStyle: "normal",
                },
                rotate: 50,
              },
            },
          ],
          yAxis: [
            {
              type: "value",
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#666", //更改坐标轴文字颜色
                  fontSize: 14, //更改坐标轴文字大小
                },
              },
            },
          ],
          series: [
            {
              type: "bar",
              barWidth: "15%",
              data: valuearr,
              itemStyle: {
                emphasis: {
                  barBorderRadius: 7,
                },
                normal: {
                  barBorderRadius: 7,
                  label: {
                    show: false, //开启显示
                    position: "top", //在上方显示
                    textStyle: {
                      //数值样式
                      color: "black",
                      fontSize: 16,
                    },
                  },
                },
              },
            },
          ],
        };
      } 
      myChart.setOption(option);
    }
  },
  filters: {
    msgFormat: (myMsg) => {
      console.log(myMsg)
      return myMsg.indexOf("-") != -1 ? myMsg : "+" + myMsg;
    },
  },
  mounted() {
    this.status = true;
    fetch("https://www.maomin.club/fy/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        var made = JSON.parse(response);
        var madeData = made.component;
        var data = madeData[0];
        this.dataObj = data;
        this.summaryDataIn = data.summaryDataIn;
        this.summaryDataOut = data.summaryDataOut;
        this.caseList = data.caseList;
        this.caseOutsideList = data.caseOutsideList;
        this.asymptomaticTopProvince = data.asymptomaticTopProvince;
        this.newAddTopProvince = data.newAddTopProvince;
        this.topAddCountry = data.topAddCountry;
        this.status = false;
      })
      .then(() => {
        this.echarts();
        this.barchats();
        this.barchats1();
        this.barchats2();
      })
      .catch((err) => {
        console.log(err);
      });
    document.addEventListener("scroll", this.scrollFix);
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.chats {
  width: 100%;
  height: 900px;
  margin-bottom: 15px;
}
.bar,.bar1,.bar2{
  width: 100%;
  height: 700px;
}
.iitit {
  font-size: 28px;
  font-weight: bold;
  margin-top: 30px;
  color: #00bec9;
}
.chats canvas {
  font-size: 26px;
}
.main {
  width: 93%;
  margin: 0 auto;
}
.ovf {
  overflow: hidden;
}
.tit {
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  padding-top: 20px;
}
.updata-time {
  text-align: right;
  color: #999;
  padding: 10px 0;
  font-size: 24px;
}
.in-t {
  font-size: 30px;
  font-weight: bold;
  padding: 10px 0 10px 10px;
  color: #fff;
  background: #00bec9;
  margin-top: 20px;
}
.indata {
  background: #f4f4f4;
  padding: 15px 0;
  border-radius: 10px;
  margin: 30px 0;
}
.indata li {
  float: left;
  width: 25%;
  text-align: center;
  margin-top: 10px;
}
.indata-t {
  font-size: 24px;
}
.indata li p {
  line-height: 56px;
}
.inlist-t div {
  font-size: 26px;
}
.in-n {
  color: #10aeb5;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
}
.dataSource {
  color: #b8b9bb;
  line-height: 42px;
  font-size: 24px;
  text-align: center;
}
.inlist,
.inlist-o,
.inlist-x {
  table-layout: fixed;
  width: 100%;
  margin-top: 15px;
  padding-bottom: 10px;
  text-align: center;
  border-spacing: 2px 6px;
  font-size: 28px;
  color: #4d5054;
}
.inlist-x {
  margin-top: 100px;
}
.show {
  position: fixed;
  left: 0;
  top: 0;
  padding-top: 10vh;
  animation: fade 0.5s ease-in;
  z-index: 100;
  width: 100%;
  height: 100vh;
  background: rgba(1, 1, 1, 0.2);
}
@keyframes fade {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
.box {
  height: 86vh;
  overflow: auto;
}
.area {
  background: #00bec9;
  color: #fff;
  padding: 20px 0;
  font-size: 26px;
}
.table-item {
  background: #f5f6f7;
  font-size: 26px;
}
.add {
  font-size: 24px;
}
.add span {
  color: #ff6a57;
}
.ff {
  overflow-y: hidden;
  width: 100%;
}
.dataview {
  width: 100%;
  height: 100vh;
  text-align: center;
  background: #fff;
}
.dataview img {
  width: 40%;
  height: 100vh;
  object-fit: contain;
  margin: 0 auto;
  line-height: 50vh;
}
.fixc {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  background: #f5f6f7;
}
.fixz {
  position: fixed;
  top: 110px;
  z-index: 999;
  width: 100%;
  background: #f5f6f7;
}
.fixc div,
.fixz div {
  display: flex;
  width: 93%;
  margin: 0 auto;
}
.fixc p,
.fixz p {
  flex: 1;
  font-weight: bold;
  text-align: center;
  font-size: 26px;
  padding: 20px 0;
}
</style>
