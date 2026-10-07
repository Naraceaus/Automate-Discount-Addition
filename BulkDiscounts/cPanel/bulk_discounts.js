if (document.getElementById('cpnlist')!=null && document.getElementById('ordcpntotal')!=null) {
	
	
	// add scroll to coupon codes dialog
	var alreadyscroll = document.querySelector('.cpnlist-wrapper') != null && window.getComputedStyle(document.querySelector('.cpnlist-wrapper')).overflowY == "scroll";

	if (!alreadyscroll) {
		var coupon_holder = document.getElementById('cpnlist');
		coupon_holder.style.overflowY="scroll";
		coupon_holder.style.maxHeight="300px";
		coupon_holder.style.display="block";
	}

	

	var apply_discounts_btn = document.querySelector('[onclick="recCPN(this, false)"]') || document.querySelector('[onclick="recCPN(this)"]');
	if (apply_discounts_btn!=null) {

		// button to attempt applying all discounts
		function applyAllDiscounts() {
			var cpn_checks = document.querySelectorAll("[type='checkbox'][name^='_cpn_']");
			for (var ci = 0; ci < cpn_checks.length; ci++) {
				cpn_checks[ci].checked=true;
			}
			apply_discounts_btn.click();
		}
		console.log(applyAllDiscounts);
		var apply_all_btn = document.createElement('input');
		apply_all_btn.className="btn pull-right";
		apply_all_btn.value="Try All Discounts";
		apply_all_btn.type="button";
		apply_all_btn.className="btn";
		apply_all_btn.addEventListener("click", applyAllDiscounts)

		apply_discounts_btn.parentElement.insertBefore(apply_all_btn, apply_discounts_btn);


		// sort applied discounts to top of list
		var targetNode = document.getElementById('ordcpntotal');
		var config = { attributes: true, childList: true, subtree: true };
		var checkActiveDiscounts = function(mutationsList, observer) {
			for(var mutation of mutationsList) {
				if (mutation.type == 'childList') {
					console.log('rearranging active discounts');
					var applied_coupon_elems = Array.from(document.querySelectorAll("[name^='_cpn_pr']")).filter(function(cpn_element) {
						return parseInt(cpn_element.value) > 0;
					});
					if (applied_coupon_elems.length > 0) {
						console.log(applied_coupon_elems);
						applied_coupon_elems.forEach(function(applied_cpn) {
							document.querySelector('#cpnlist tbody').prepend(applied_cpn.closest('tr'));
						})
					}
				}
			}
		};

		var observer = new MutationObserver(checkActiveDiscounts);
		observer.observe(targetNode, config);
	}
	
	
}

