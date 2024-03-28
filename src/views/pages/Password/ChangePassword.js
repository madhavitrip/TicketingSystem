import React from 'react'
import PageLayout from '../login/PageLayout';
import ChangePasswordForm from './ChangePasswordForm';

const ChangePassword = () => {

  const theme = '#FF725E';
  return (
    <PageLayout bgimg='bgimgchangepass' theme={theme}>
      <div>ChangePassword</div>


      <ChangePasswordForm/>



    </PageLayout>
    
  )
}

export default ChangePassword