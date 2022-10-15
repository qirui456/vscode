// 封装专门处理事件的方法
import * as dayjs from 'dayjs'
import * as isLeapYear from 'dayjs/plugin/isLeapYear' // 导入插件
import 'dayjs/locale/zh-cn' // 导入本地化语言


/**
 * 
 * @param {*} targetTime 
 * @returns 系统时间到之前指定时间的距离值
 */

export const timeAgo = (targetTime) => {
    dayjs.extend(isLeapYear)
    dayjs.locale('zh')
    var a = dayjs
    var b = dayjs(targetTime)
    return a.to(b) //返回多久之前你
}