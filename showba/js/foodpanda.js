        // 初始化折扣选择
        document.querySelectorAll('.toggle-option').forEach(option => {
            option.addEventListener('click', function() {
                document.querySelectorAll('.toggle-option').forEach(el => {
                    el.classList.remove('active');
                });
                this.classList.add('active');
                
                // 显示或隐藏折扣输入区域
                const discountSection = document.getElementById('discountSection');
                if (this.dataset.discount === 'yes') {
                    discountSection.classList.add('visible');
                } else {
                    discountSection.classList.remove('visible');
                }
            });
        });
        
        // 默认选择"需要折扣"
        document.querySelector('[data-discount="yes"]').classList.add('active');
        document.getElementById('discountSection').classList.add('visible');
        
        // 计算按钮事件
        document.getElementById('calculateBtn').addEventListener('click', calculate);
        function calculate() {
            // 获取输入值
            const value1 = parseFloat(document.getElementById('value1').value) || 0;
            const value2 = parseFloat(document.getElementById('value2').value) || 0;
            const operation = document.getElementById('operation').value;
            
            // 获取折扣状态
            const discountOption = document.querySelector('.toggle-option.active');
            const applyDiscount = discountOption ? discountOption.dataset.discount === 'yes' : 'no';
            
            // 获取折扣值
            let discountValue = 0;
            let discountType = 'percent';
            if (applyDiscount) {
                discountValue = parseFloat(document.getElementById('discountValue').value) || 0;
                discountType = document.getElementById('discountType').value;
            }
            
            // 执行基本运算
            let baseResult;
            if (operation === 'subtract') {
               baseResult = value1 - value2;
            }
            else{
                if(operation ==='addsum'){
                    baseResult = value1 - discountValue + value2;
                }
            }

            
            // 应用折扣
            let finalResult = value1 - discountValue;
            let discountApplied = 0;
            
            if (applyDiscount) {
                if (discountType === 'fixed') {
                    discountApplied = finalResult + value2
                    // discountApplied = baseResult * (discountValue / 100);
                    // finalResult = baseResult - discountApplied;
                } 
            }
            
            // 显示结果
            const resultElement = document.getElementById('result');
            const stepsElement = document.getElementById('calculationSteps');
            
            stepsElement.innerHTML = `
                <div class="calculation-step">
                    輸入數值: <span class="value">${value1}</span> 和 <span class="value">${value2}</span>
                </div>
                <!---<div class="calculation-step">
                    執行操作: <span class="operation">${operation === 'add' ? '加法 (+)' : '减法 (-)'}</span>
                </div>--->
               <!--- <div class="calculation-step">
                    基礎結果: <span class="value">${value1}</span> ${operation === 'add' ? '+' : '-'} 
                    <span class="value">${discountValue}</span>${operation === 'add' ? '+' : '-'} <span class="value">${value2}</span> = <span class="value">${baseResult}</span>
                </div>--->
                
                ${applyDiscount ? `
                <div class="calculation-step">
                    折扣狀態: <span class="discount">已應用折扣</span>
                </div>
               <!--- <div class="calculation-step">
                    折扣類型: <span class="discount">${discountType === 'percent' ? '百分比 (' + discountValue + '%)' : '固定金额 (' + discountValue + ')'}</span>
                </div> --->
                <div class="calculation-step">
                    折扣金額: <span class="discount">${discountValue}</span>
                </div>
                ` : `
                <div class="calculation-step">
                    折扣狀態: <span class="discount">未應用折扣</span>
                </div>
                `}
                
                <div class="calculation-step final-result">
                    不含購物袋金額: <span class="value">${baseResult}</span> <br>
                    含購物袋金額:<span class="value">${baseResult+3}</span>
                </div>
            `;

            resultElement.classList.add('visible');

        }
        
