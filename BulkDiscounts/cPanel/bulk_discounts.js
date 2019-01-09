if (document.querySelector('[onclick="recCPN(this, false)"]')!=null && document.getElementById('cpnlist')!=null && document.getElementById('ordcpntotal')!=null) {
	function applyAllDiscounts() {
		var cpn_checks = document.querySelectorAll("[type='checkbox'][name^='_cpn_']");
		for (var ci = 0; ci < cpn_checks.length; ci++) {
			cpn_checks[ci].checked=true;
		}
		document.querySelector('[onclick="recCPN(this, false)"]').click();
	}
	console.log(applyAllDiscounts);
	var apply_all_btn = document.createElement('input');
	apply_all_btn.className="btn pull-right";
	apply_all_btn.value="Try All Discounts";
	apply_all_btn.type="button";
	apply_all_btn.className="btn";
	apply_all_btn.addEventListener("click", applyAllDiscounts)

	var existing_button = document.querySelector('[onclick="recCPN(this, false)"]');
	existing_button.parentElement.insertBefore(apply_all_btn, existing_button);

	// add scroll to coupon codes dialog
	var coupon_holder = document.getElementById('cpnlist').parentElement;
	coupon_holder.style.overflow="scroll";
	coupon_holder.style.maxHeight="300px";


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

