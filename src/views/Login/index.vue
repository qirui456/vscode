 <template>
  <div>
    <van-nav-bar title="黑马头条-登录" />
    <div>
        <!-- van-form整体表单组件
        @submit事件

        van-field 输入框(表单一项)
        输入框name属性="用户名"
        表单整体提交时,默认收集一个提交对象
        往后台发送的参数名就是name里值
        {"用户名" : '页面值'}
         -->
      <van-form @submit="onSubmit">
        <van-field
          v-model="user.mobile"
          name="mobile"
            required
          label="手机号"
          placeholder="请输入11位手机号"
          :rules="[{ required: true, message: '请填写11位手机号',pattern: /^1[3-9]\d{9}$/ }]"
        />
        <van-field
          v-model="user.code"
          type="password"
           required
          name="code"
          label="密码"
          placeholder="请输入6位密码"
          :rules="[{ required: true, message: '请填写密码',pattern: /^\d{6}$/ }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
           loading-text="加载中..." 
           :disabled='isLoading'
           :loading='isLoading' 
           >提交</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { loginAPI } from '@/api'
import { Notify }  from 'vant'
import { setToken } from '@/utils/token.js'
export default {
  data() {
    return {
     user:{
       mobile:'', //手机号
       code:''  //验证码(密码-必须是246810后台规定S的,无论手机号是什么)
     },
     isLoading:false
    };
  },
  methods: {
    async onSubmit(values) {
      console.log("submit", values);
      console.log(this.user)

      // 状态true
  this.isLoading = true
      try{
        const res = await loginAPI(this.user)
        console.log(res)  
        Notify({ type: 'success', message: '登录成功' });
        setToken(res.data.data.token)
        // 跳转一定要写到最后 -> 最后执行
        this.$router.replace({
          path:'/layout/home'
        })
      }catch (err){
       Notify({ type: 'danger', message: '账号或者密码错误' });
      }
      // 网络请求完成关闭
      this.isLoading = false
    },
  },
};
</script>

<style lang="scss" scoped>
.van-nav-bar {
  background-color: #007bff;
}
::v-deep .van-nav-bar__title {
  color: white;
}
</style>
