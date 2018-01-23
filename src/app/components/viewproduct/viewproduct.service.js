export function ProductDataService() {
	return {
		getProduct: function() {
			return [{
				id: 123,
				name: 'iPod Shuffle',
				description: 'YOLO street art irony, heirloom synth ramps distillery waistcoat bitters bespoke wolf beard. Skateboard lumbersexual offal mixtape, knausgaard pabst brunch fingerstache cred.',
				productImage: 'assets/images/product_big.png',
				template: 'ipod_shuffle',
				startTime: '2015-11-20 17:30:00',
				shortDescription: 'Remeber how free the clouds'
			},{
				id: 124,
				name: 'Jaw Bone',
				description: 'YOLO street art irony, heirloom synth ramps distillery waistcoat bitters bespoke wolf beard. Skateboard lumbersexual offal mixtape, knausgaard pabst brunch fingerstache cred.',
				productImage: 'assets/images/product_sm.png',
				template: 'jawbone_fitbit',
				startTime: '2015-11-25 16:00:00',	
				shortDescription: 'Remeber how free the clouds'
			}];
		}
	};
}
